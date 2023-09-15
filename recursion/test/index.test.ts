// @ts-ignore
import { expect } from 'chai';
import ethers, { Contract } from 'ethers';
import path from 'path';
import { Noir } from '../utils/noir';
import { execSync } from 'child_process';

import verifier from '../artifacts/circuits/recursion/contract/recursion/plonk_vk.sol/UltraVerifier.json';
import mainCircuit from '../circuits/main/target/main.json';
import recursiveCircuit from '../circuits/recursion/target/recursion.json';

// import { input } from '../input';
import { test, beforeAll, describe } from 'vitest';

describe('It compiles noir program code, receiving circuit bytes and abi object.', () => {
  const noirInstances : {main: Noir, recursive: Noir} = {
    main: new Noir(mainCircuit),
    recursive: new Noir(recursiveCircuit)
  }

  let recursiveInputs : string[] = [];

  it('Should generate valid proof for correct input', async () => {
    const { main: noir } = noirInstances;

    const input = [ethers.utils.hexZeroPad('0x1', 32), ethers.utils.hexZeroPad('0x2', 32)];
    await noir.init();
    const witness = await noir.generateWitness(input);
    const proof = await noir.generateInnerProof(witness);

    console.log(proof)
    expect(proof instanceof Uint8Array).to.be.true;

    const verified = await noir.verifyInnerProof(proof);
    expect(verified).to.be.true;

    const numPublicInputs = 1;
    const { proofAsFields, vkAsFields, vkHash } = await noir.generateInnerProofArtifacts(
      proof,
      numPublicInputs,
    );
    expect(vkAsFields).to.be.of.length(114);
    expect(vkHash).to.be.a('string');

    const aggregationObject = Array(16).fill(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
    recursiveInputs = [
      ...vkAsFields.map(e => e.toString()),
      ...proofAsFields,
      input[1],
      vkHash.toString(),
      ...aggregationObject,
    ];

    noir.destroy();
  });

  it('Should verify proof within a proof', async () => {
    const { recursive: noir } = noirInstances;
    await noir.init();

    const witness = await noir.generateWitness(recursiveInputs);
    const proof = await noir.generateOuterProof(witness);
    expect(proof instanceof Uint8Array).to.be.true;
    console.log(proof);

    const verified = await noir.verifyOuterProof(proof);
    console.log(verified);
    noir.destroy();
  });
});
