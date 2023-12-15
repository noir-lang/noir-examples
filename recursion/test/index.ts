// @ts-ignore
import { expect } from 'chai';
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend, flattenPublicInputs } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Circuits, Noirs } from '../types.js';
import hre from 'hardhat';
import { compile } from '@noir-lang/noir_wasm';
import path from 'path';
import { ProofData } from '@noir-lang/types';
import {  bytesToHex } from 'viem';
import { getArtifactsPath } from '../utils/wagmi-viem.js';

const getCircuit = async (name: string) => {
  const { program } = compile(path.resolve("circuits", name, "src", `${name}.nr`));
  return program
}


describe('It compiles noir program code, receiving circuit bytes and abi object.', () => {
  let circuits : Circuits;
  let backends : BackendInstances;
  let noirs : Noirs;
  
  const mainInput = { x : 1, y : 2 };

  before(async () => {
    circuits = {
      main: await getCircuit("main"), 
      recursive: await getCircuit("recursion")
    }
    backends = {
      main: new BarretenbergBackend(circuits.main, { threads: 8 }),
      recursive: new BarretenbergBackend(circuits.recursive, { threads: 8 })
    }
    noirs = {
      main: new Noir(circuits.main, backends.main),
      recursive: new Noir(circuits.recursive, backends.recursive)
    }
  })


  after(async () => {
    await backends.main.destroy();
    await backends.recursive.destroy();
  })

  describe("Normal flow", async() => {
    let mainProof : ProofData;

    describe("Proof generation", async () => {
      it('Should generate a final proof', async () => {
        mainProof = await noirs.main.generateFinalProof(mainInput)
        expect(mainProof.proof instanceof Uint8Array).to.be.true;
      });
    })

    describe("Proof verification", async() => {
     
      it('Should verify off-chain', async () => {
        const verified = await noirs.main.verifyFinalProof(mainProof);
        expect(verified).to.be.true;
      });

      it("Should verify on-chain", async () => {
        const verifierContract = await hre.viem.deployContract(getArtifactsPath("main"), []);
        const { proof, publicInputs } = mainProof;
        const verified = await verifierContract.read.verify([bytesToHex(proof), flattenPublicInputs(publicInputs)]);
        expect(verified).to.be.true;
      })
    })
  })

  describe("Recursive flow", async() => {
    let circuits : Circuits;
    let backends : BackendInstances;
    let noirs : Noirs;
    
    const mainInput = { x : 1, y : 2 };

    let recursiveInputs : any;
    let recursiveProof : ProofData;

    before(async () => {
      circuits = {
        main: await getCircuit("main"), 
        recursive: await getCircuit("recursion")
      }
      backends = {
        main: new BarretenbergBackend(circuits.main, {threads: 8}),
        recursive: new BarretenbergBackend(circuits.recursive, {threads: 8})
      }
      noirs = {
        main: new Noir(circuits.main, backends.main),
        recursive: new Noir(circuits.recursive, backends.recursive)
      }
    })

    after(async () => {
      await backends.main.destroy();
      await backends.recursive.destroy();
    })

    describe("Proof generation", async() => {
      it('Should generate an intermediate proof', async () => {

        const { witness, returnValue } = await noirs.main.execute(mainInput);
        const {proof, publicInputs} = await backends.main.generateIntermediateProof(witness);

        expect(proof instanceof Uint8Array).to.be.true;

        const verified = await backends.main.verifyIntermediateProof({ proof, publicInputs});
        expect(verified).to.be.true;

        const numPublicInputs = 1;
        const { proofAsFields, vkAsFields, vkHash } = await backends.main.generateIntermediateProofArtifacts(
          {publicInputs, proof},
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
          public_inputs: [mainInput.y],
          key_hash: vkHash,
          input_aggregation_object: aggregationObject,
        }

      });

      it("Should generate a final proof with a recursive input", async () => {
        recursiveProof = await noirs.recursive.generateFinalProof(recursiveInputs)
        expect(recursiveProof.proof instanceof Uint8Array).to.be.true;
      })
    });

    describe("Proof verification", async() => {
      it('Should verify off-chain', async () => {
        const verified = await noirs.recursive.verifyFinalProof(recursiveProof);
        expect(verified).to.be.true;
      });

      it("Should verify on-chain", async () => {
        const verifierContract = await hre.viem.deployContract(getArtifactsPath("recursion"), []);
        const verified = await verifierContract.read.verify([bytesToHex(recursiveProof.proof), flattenPublicInputs(recursiveProof.publicInputs)]);
        expect(verified).to.be.true;
      })
    })
  })
});
