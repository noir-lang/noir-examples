// @ts-ignore
import { expect } from 'chai';
import { Noir, generateWitness } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';

import mainCircuit from '../target/main.json';
import recursiveCircuit from '../target/recursion.json';
import { BackendInstances, Circuits, Noirs } from '../types';


import { initializeResolver } from '@noir-lang/source-resolver';
import { compile, init_log_level as compilerLogLevel } from '@noir-lang/noir_wasm';
import path from 'path';


async function getCircuit(name: string) {
  // await newCompiler();

  const compiled = await compile(path.resolve("circuits", name, "src", `${name}.nr`));
  return compiled
}

describe('It compiles noir program code, receiving circuit bytes and abi object.', () => {
  let circuits : Circuits;
  let backends : BackendInstances;
  let noirs : Noirs;
  
  let recursiveInputs : any;

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

  it('Should generate valid proof for correct input', async () => {
    const input = { x : 1, y : 2 };
    await noirs.main.init();

    const { witness, returnValue } = await noirs.main.execute(input);
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
      public_inputs: [input.y],
      key_hash: vkHash,
      input_aggregation_object: aggregationObject,
    }

    backends.main.destroy();
  });

  it('Should verify proof within a proof', async () => {
    await noirs.recursive.init();

    const {witness, returnValue} = await noirs.recursive.execute(recursiveInputs);
    console.log(witness)
    const {proof, publicInputs} = await backends.recursive.generateFinalProof(witness);
    console.log(proof)
    expect(proof instanceof Uint8Array).to.be.true;

    const verified = await backends.recursive.verifyFinalProof({proof, publicInputs});
    console.log(verified)
    expect(verified).to.be.true;
    backends.recursive.destroy();
  });
});
