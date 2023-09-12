// @ts-ignore
import ethers, { Contract } from 'ethers';
import fs from 'fs';
import path from 'path';
import { exec, execSync } from 'child_process';
import { MerkleTree } from '../utils/merkleTree'; // MerkleTree.js
import merkle from './merkle.json'; // merkle
import keccak256 from 'keccak256';

import { NoirNode } from '../utils/noir/noirNode';
import { Fr } from '@aztec/bb.js/dest/node/types';

// @ts-ignore -- no types
import blake2 from 'blake2';

import airdrop from '../artifacts/circuits/contract/Airdrop.sol/Airdrop.json';
import verifier from '../artifacts/circuits/contract/stealthdrop/plonk_vk.sol/UltraVerifier.json';

import { test, beforeAll, describe, expect } from 'vitest';

describe('Setup', () => {
  let verifierContract: Contract;
  let airdropContract: Contract;
  let merkleTree: MerkleTree;
  let messageToHash = '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';
  let hashedMessage: string;
  let provider = ethers.getDefaultProvider('http://127.0.0.1:8545');
  let deployerWallet = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY as unknown as string,
    provider,
  );

  beforeAll(async () => {
    const Verifier = new ethers.ContractFactory(verifier.abi, verifier.bytecode, deployerWallet);
    verifierContract = await Verifier.deploy();

    const verifierAddr = await verifierContract.deployed();
    console.log(`Verifier deployed to ${verifierAddr.address}`);

    const Airdrop = new ethers.ContractFactory(airdrop.abi, airdrop.bytecode, deployerWallet);

    // Setup merkle tree
    merkleTree = new MerkleTree(4);
    await merkleTree.initialize([]);

    await Promise.all(
      merkle.map(async (addr: any) => {
        // @ts-ignore
        const leaf = Fr.fromString(addr);
        merkleTree.insert(leaf);
      }),
    );

    hashedMessage = ethers.utils.hashMessage(messageToHash); // keccak of "signthis"
    airdropContract = await Airdrop.deploy(
      merkleTree.root().toString(),
      hashedMessage,
      verifierAddr.address,
      '3500000000000000000000',
    );
    await airdropContract.deployed();
    console.log('Airdrop deployed to:', airdropContract.address);
  });

  describe('Airdrop', () => {
    let user1: ethers.Wallet;
    let user2: ethers.Wallet;
    let claimer1: ethers.Wallet;
    let claimer2: ethers.Wallet;

    beforeAll(async () => {
      const provider = ethers.getDefaultProvider('http://127.0.0.1:8545');
      user1 = new ethers.Wallet(process.env.USER1_PRIVATE_KEY as string, provider);
      claimer1 = new ethers.Wallet(process.env.CLAIMER1_PRIVATE_KEY as string, provider);
      claimer2 = new ethers.Wallet(process.env.CLAIMER2_PRIVATE_KEY as string, provider);
    });

    const getUserAbi = async (user: ethers.Wallet) => {
      const leaf = Fr.fromString(user.address);
      const pubKey = user.publicKey;
      const signature = await user1.signMessage(messageToHash);
      const index = merkleTree.getIndex(leaf);
      const mt = merkleTree.proof(index);
      const nullifier = blake2
        .createHash('blake2s')
        .update(ethers.utils.arrayify(signature).slice(0, 64))
        .digest();

      const arr = [
        ...ethers.utils.arrayify("0x" + pubKey.slice(4)), 
        ...ethers.utils.arrayify(signature).slice(0, 64), 
        ...ethers.utils.arrayify(hashedMessage), 
        ...ethers.utils.arrayify("0x" + nullifier.toString("hex")), 
        ...mt.pathElements.map(el => el.toBuffer()),
        "0x" + index.toString(),
        mt.root.toString(),
        claimer1.address,
        claimer1.address,
      ]
      const userAbi = new Map<number, string>();

      for (let i = 0; i < arr.length; i++) {
        // @ts-ignore
        userAbi.set(i + 1, ethers.utils.hexZeroPad(arr[i], 32))
      }
      return {userAbi, nullifier};
    };

    const noir = new NoirNode();

    test('Collects tokens from an eligible user', async () => {
      const {userAbi, nullifier} = await getUserAbi(user1);

      // console.log(JSON.stringify(Array.from(userAbi.values())))

      console.log(userAbi)
      await noir.init();
      const witness = await noir.generateWitness(userAbi);

      const proof = await noir.generateProof(witness);

      const verification = await noir.verifyProof(proof);
      console.log(verification)

      // // 2240
      // const publicInputs = ethers.utils.hexlify(proof).slice(2).slice(0, 2112);
      // const cutDownProof = '0x' + ethers.utils.hexlify(proof).slice(2).slice(2112);

      // console.log("proof", ethers.utils.hexlify(proof))
      // console.log("cutDownProof", cutDownProof)
      // console.log("publicInputs", publicInputs.match(/.{1,64}/g).map(x => '0x' + x))

      // const connectedAirdropContract = airdropContract.connect(claimer1);
      // const balanceBefore = await connectedAirdropContract.balanceOf(claimer1.address);
      // expect(balanceBefore.toNumber()).to.equal(0);

      // await verifierContract.verify(
      //   cutDownProof,
      //   publicInputs.match(/.{1,64}/g).map(x => '0x' + x),
      // );

      // const balanceAfter = await connectedAirdropContract.balanceOf(claimer1.address);
      // expect(balanceAfter.toNumber()).to.equal(1);
    });

    // test('Fails to collect tokens of an eligible user with a non-authorized account (front-running)', async () => {
    //   try {
    //     const userAbi = await getUserAbi(user1);
    //     console.log('Valid ABI', userAbi);
    //     const proof = prove(userAbi, 'valid');
    //     expect(proof).to.exist;

    //     const connectedAirdropContract = airdropContract.connect(claimer2);
    //     const balanceBefore = await connectedAirdropContract.balanceOf(claimer2.address);
    //     expect(balanceBefore.toNumber()).to.equal(0);
    //     await connectedAirdropContract.claim(
    //       '0x' + proof.toString(),
    //       ethers.utils.hexlify(userAbi.nullifier),
    //     );

    //     const balanceAfter = await connectedAirdropContract.balanceOf(claimer2.address);
    //     expect(balanceAfter.toNumber()).to.equal(0);
    //   } catch (e: any) {
    //     expect(e.error.reason).to.contain('PROOF_FAILURE()');
    //   }
    // });
  });
});
