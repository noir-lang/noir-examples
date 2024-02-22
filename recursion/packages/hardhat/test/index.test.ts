import chai from 'chai';
const { expect } = chai;
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Circuits, Noirs } from '../types.js';
import hre from 'hardhat';
const { viem } = hre;
import { compile, createFileManager } from '@noir-lang/noir_wasm';
import { join, resolve } from 'path';
import { ProofData } from '@noir-lang/types';
import { bytesToHex } from 'viem';

async function getCircuit(name: string) {
  const basePath = resolve(join('../noir', name));
  const fm = createFileManager(basePath);
  const compiled = await compile(fm, basePath);
  console.log(compiled);
  if (!('program' in compiled)) {
    throw new Error('Compilation failed');
  }
  return compiled.program;
}

describe('It compiles noir program code, receiving circuit bytes and abi object.', () => {
  let circuits: Circuits;
  let backends: BackendInstances;
  let noirs: Noirs;

  const mainInput = { x: 1, y: 2 };

  before(async () => {
    circuits = {
      main: await getCircuit('main'),
      recursive: await getCircuit('recursion'),
    };
    backends = {
      main: new BarretenbergBackend(circuits.main, { threads: 8 }),
      recursive: new BarretenbergBackend(circuits.recursive, { threads: 8 }),
    };
    noirs = {
      main: new Noir(circuits.main, backends.main),
      recursive: new Noir(circuits.recursive, backends.recursive),
    };
  });

  after(async () => {
    await backends.main.destroy();
    await backends.recursive.destroy();
  });

  describe('Recursive flow', async () => {
    let recursiveInputs: any;
    let intermediateProof: ProofData;
    let finalProof: ProofData;

    describe('Proof generation', async () => {
      it('Should generate an intermediate proof', async () => {
        intermediateProof = await noirs.main.generateProof(mainInput);

        const { proof, publicInputs } = intermediateProof;
        expect(proof instanceof Uint8Array).to.be.true;

        const verified = await noirs.main.verifyProof({ proof, publicInputs });
        expect(verified).to.be.true;

        const numPublicInputs = 1;
        const { proofAsFields, vkAsFields, vkHash } =
          await backends.main.generateRecursiveProofArtifacts(
            { publicInputs, proof },
            numPublicInputs,
          );
        expect(vkAsFields).to.be.of.length(114);
        expect(vkHash).to.be.a('string');

        recursiveInputs = {
          verification_key: vkAsFields,
          proof: proofAsFields,
          public_inputs: [mainInput.y],
          key_hash: vkHash,
        };
      });

      it('Should generate a final proof with a recursive input', async () => {
        finalProof = await noirs.recursive.generateProof(recursiveInputs);
        expect(finalProof.proof instanceof Uint8Array).to.be.true;
      });
    });

    describe('Proof verification', async () => {
      let verifierContract: any;

      before(async () => {
        verifierContract = await viem.deployContract('UltraVerifier');
      });

      it('Should verify off-chain', async () => {
        const verified = await noirs.recursive.verifyProof(finalProof);
        expect(verified).to.be.true;
      });

      it('Should verify on-chain', async () => {
        const verified = await verifierContract.read.verify(
          bytesToHex(finalProof.proof),
          finalProof.publicInputs,
        );
        expect(verified).to.be.true;
      });
    });
  });
});
