// @ts-ignore
import { MerkleTree } from '../utils/merkleTree'; // MerkleTree.js
import merkle from './merkle.json'; // merkle
import { viem } from "hardhat"
import { localhost } from 'viem/chains'

import toml from 'toml';
import { Fr } from '@aztec/bb.js';

// @ts-ignore -- no types
import blake2 from 'blake2';

import { Airdrop, UltraVerifier } from '../typechain-types';
import { Wallet } from 'ethers';
import { PublicClient, WalletClient, fromHex, hashMessage, http, recoverPublicKey, toHex } from 'viem';

import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir }  from '@noir-lang/noir_js';
import { CompiledCircuit } from "@noir-lang/types"
import { compile } from "@noir-lang/noir_wasm"

import { initializeResolver } from '@noir-lang/source-resolver';
import path, { resolve } from 'path';

import circuit from "../circuits/target/stealthdrop.json"
import { readFileSync } from 'fs';
import axios from 'axios';

describe('Setup', () => {
  let publicClient : PublicClient;
  
  let verifierContract: UltraVerifier;
  let airdropContract: Airdrop;
  let merkleTree: MerkleTree;
  let messageToHash : `0x${string}`= '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';
  let hashedMessage: string;

  before(async () => {
    publicClient = await viem.getPublicClient();
  
    const verifier = await viem.deployContract('UltraVerifier');
    console.log(`Verifier deployed to ${verifier.address}`);


    // Setup merkle tree
    merkleTree = new MerkleTree(4);
    await merkleTree.initialize([]);

    await Promise.all(
      merkle.map(async (addr: any) => {
        merkleTree.insert(Fr.fromString(addr));
      }),
    );

    hashedMessage = hashMessage(messageToHash); // keccak of "signthis"

    const airdrop = await viem.deployContract('Airdrop', [
      merkleTree.root().toString(),
      hashedMessage,
      verifier.address,
      '3500000000000000000000',
    ]);

    console.log(`Airdrop deployed to ${airdrop.address}`);
  });

  describe('Airdrop', () => {
    let user1: WalletClient;
    let user2: WalletClient;
    let claimer1: WalletClient;
    let claimer2: WalletClient;

    let circuit : CompiledCircuit
    let backend : BarretenbergBackend;
    let noir : Noir;

    before(async () => {
      ([user1, user2, claimer1, claimer2] = await viem.getWalletClients());
      
      initializeResolver((id : string) => {
        console.log('source-resolver: resolving:', id);

        return id;
      })

      const circuitPath = path.resolve("circuits/src/main.nr")
      console.log(circuitPath)
      // circuit = await compile(circuitPath);

      backend = new BarretenbergBackend(circuit, { threads: 8 });
      noir = new Noir(circuit, backend);

    });

    const getClaimInputs = async ({user} : { user: WalletClient }) => {
      const leaf = user.account!.address;
      const index = merkleTree.getIndex(Fr.fromString(leaf));
      const signature = await user1.signMessage({ account: user1.account!.address, message: messageToHash })
      const nullifier = blake2
          .createHash('blake2s')
          .update(fromHex(signature, "bytes").slice(0, 64))
          .digest("hex")

      const pubKey = await recoverPublicKey({hash: messageToHash, signature});
      console.log(pubKey.slice(2))
      console.log(pubKey.slice(2).length)
      console.log(fromHex(pubKey.slice(2) as `0x{bytes}`, "bytes"))
      return {
          "pub_key": pubKey.slice(2)
          // signature: signature.slice(0, 130),
          // hashed_message: messageToHash,
          // nullifier : `0x${nullifier}`,
          // merkle_path : merkleTree.proof(index).pathElements.map((x : any) => x.toString()),
          // index: `0x${index.toString()}`,
          // merkle_root : merkleTree.root().toString(),
          // claimer_priv: claimer1.account!.address,
          // claimer_pub: claimer1.account!.address,
      };
    };

    // const noir = new NoirNode();

    it('Collects tokens from an eligible user', async () => {
      const inputs = await getClaimInputs({ user: user1 });

      // console.log(inputs)
      // const proof = await noir.execute(inputs);
      // console.log(proof)

      // const verification = await noir.verifyProof(proof);
      // console.log(verification)

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
