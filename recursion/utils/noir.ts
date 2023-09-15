import { decompressSync } from 'fflate';
// @ts-ignore
import { Barretenberg, Crs, RawBuffer } from '@aztec/bb.js';
import { executeCircuit, compressWitness } from '@noir-lang/acvm_js';
import { ethers } from 'ethers'; // I'm lazy so I'm using ethers to pad my input
import { Ptr } from '@aztec/bb.js/dest/browser/types';

export class Noir {
  circuit: any;
  acir: string = '';
  acirBufferCompressed: Uint8Array = Uint8Array.from([]);
  acirBufferUncompressed: Uint8Array = Uint8Array.from([]);

  api = {} as Barretenberg;
  acirComposer = {} as Ptr;

  constructor(circuit: Object) {
    this.circuit = circuit;
  }

  async init() {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const { default: initACVM } = await import('@noir-lang/acvm_js');
      await initACVM();
    }

    this.acirBufferCompressed = Buffer.from(this.circuit.bytecode, 'base64');
    this.acirBufferUncompressed = decompressSync(this.acirBufferCompressed);

    this.api = await Barretenberg.new(4);

    const [exact, total, subgroup] = await this.api.acirGetCircuitSizes(
      this.acirBufferUncompressed,
    );
    const subgroupSize = Math.pow(2, Math.ceil(Math.log2(total)));
    const crs = await Crs.new(subgroupSize + 1);
    await this.api.commonInitSlabAllocator(subgroupSize);
    await this.api.srsInitSrs(
      new RawBuffer(crs.getG1Data()),
      crs.numPoints,
      new RawBuffer(crs.getG2Data()),
    );

    this.acirComposer = await this.api.acirNewAcirComposer(subgroupSize);
  }

  // Generates the intermediate witnesses by using `input`
  // as the initial set of witnesses and executing these
  // against the circuit.
  async generateWitness(input: any): Promise<Uint8Array> {
    const initialWitness = new Map<number, string>();
    for (let i = 1; i <= input.length; i++) {
      initialWitness.set(i, ethers.utils.hexZeroPad(input[i - 1], 32));
    }

    const witnessMap = await executeCircuit(this.acirBufferCompressed, initialWitness, () => {
      throw Error('unexpected oracle');
    });

    const witnessBuff = compressWitness(witnessMap);
    return witnessBuff;
  }

  // Generates an inner proof. This is the proof that will be verified
  // in another circuit.
  //
  // We set isRecursive to true, which will tell the backend to
  // generate the proof using components that will make the proof
  // easier to verify in a circuit.
  async generateInnerProof(witness: Uint8Array) {
    const makeEasyToVerifyInCircuit = true;
    return this.generateProof(witness, makeEasyToVerifyInCircuit);
  }

  // Generates artifacts that will be passed to the circuit that will verify this proof.
  //
  // Instead of passing the proof and verification key as a byte array, we pass them
  // as fields which makes it cheaper to verify in a circuit.
  //
  // The number of public inputs denotes how many public inputs are in the inner proof.
  async generateInnerProofArtifacts(proof: Uint8Array, numOfPublicInputs: number = 0) {
    console.log('serializing proof');
    const proofAsFields = await this.api.acirSerializeProofIntoFields(
      this.acirComposer,
      proof,
      numOfPublicInputs,
    );
    console.log('proof serialized');
    console.log('serializing vk');
    await this.api.acirInitVerificationKey(this.acirComposer);
    // Note: If you don't init verification key, `acirSerializeVerificationKeyIntoFields`` will just hang on serialization
    const vk = await this.api.acirSerializeVerificationKeyIntoFields(this.acirComposer);
    console.log('vk serialized');

    return {
      proofAsFields: proofAsFields.map(p => p.toString()),
      vkAsFields: vk[0].map(vk => vk.toString()),
      vkHash: vk[1].toString(),
    };
  }

  // Generate an outer proof. This is the proof for the circuit which will verify
  // inner proofs.
  //
  // The settings for this proof are the same as the settings for a "normal" proof
  // ie one that is not in the recursive setting.
  async generateOuterProof(witness: Uint8Array) {
    const makeEasyToVerifyInCircuit = false;
    return this.generateProof(witness, makeEasyToVerifyInCircuit);
  }

  async generateProof(witness: Uint8Array, makeEasyToVerifyInCircuit: boolean) {
    console.log('Creating outer proof');

    const decompressedWitness = decompressSync(witness);

    const proof = await this.api.acirCreateProof(
      this.acirComposer,
      this.acirBufferUncompressed,
      decompressedWitness,
      makeEasyToVerifyInCircuit,
    );

    return proof;
  }

  async verifyInnerProof(proof: Uint8Array) {
    const makeEasyToVerifyInCircuit = true;
    return this.verifyProof(proof, makeEasyToVerifyInCircuit);
  }

  async verifyOuterProof(proof: Uint8Array) {
    const makeEasyToVerifyInCircuit = false;
    console.log('veirfying outer proof');
    const verified = await this.verifyProof(proof, makeEasyToVerifyInCircuit);
    console.log(verified);
    return verified;
  }

  async verifyProof(proof: Uint8Array, makeEasyToVerifyInCircuit: boolean) {
    await this.api.acirInitVerificationKey(this.acirComposer);
    const verified = await this.api.acirVerifyProof(
      this.acirComposer,
      proof,
      makeEasyToVerifyInCircuit,
    );
    return verified;
  }

  async destroy() {
    await this.api.destroy();
  }
}
