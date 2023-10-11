// @ts-ignore
import { expect } from 'chai';
import { Noir, generateWitness } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';

import mainCircuit from '../target/main.json';
import recursiveCircuit from '../target/recursion.json';
import { BackendInstances } from '../types';


describe('It compiles noir program code, receiving circuit bytes and abi object.', () => {
  const backends : BackendInstances = {
    main: new BarretenbergBackend(mainCircuit, 8),
    recursive: new BarretenbergBackend(recursiveCircuit, 8)
  }
  const noirs : {main: Noir, recursive: Noir} = {
    main: new Noir(mainCircuit, backends.main),
    recursive: new Noir(recursiveCircuit, backends.recursive)
  }

  let recursiveInputs : any;

  it('Should generate valid proof for correct input', async () => {
    const { main: noir } = noirs;
    const { main: backend } = backends

    const input = { x : 1, y : 2 };
    await noir.init();
    const witness = await generateWitness(mainCircuit, input);
    const proof = await backend.generateIntermediateProof(witness);

    expect(proof instanceof Uint8Array).to.be.true;

    const verified = await backend.verifyIntermediateProof(proof);
    expect(verified).to.be.true;

    const numPublicInputs = 1;
    const { proofAsFields, vkAsFields, vkHash } = await backend.generateIntermediateProofArtifacts(
      proof,
      numPublicInputs,
    );
    expect(vkAsFields).to.be.of.length(114);
    expect(vkHash).to.be.a('string');

    const aggregationObject = Array(16).fill(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
    recursiveInputs = {
      verification_key: vkAsFields,
      proof: proofAsFields,
      public_inputs: [input.y],
      key_hash: vkHash,
      input_aggregation_object: aggregationObject,
    }

    backend.destroy();
  });

  it('Should verify proof within a proof', async () => {
    const { recursive: noir } = noirs;
    const { recursive: backend } = backends;

    await noir.init();

    const witness = await generateWitness(recursiveCircuit, recursiveInputs);
    const proof = await backend.generateFinalProof(witness);
    expect(proof instanceof Uint8Array).to.be.true;

    const verified = await backend.verifyFinalProof(proof);
    expect(verified).to.be.true;
    backend.destroy();
  });
});
