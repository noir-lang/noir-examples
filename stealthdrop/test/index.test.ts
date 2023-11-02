// @ts-ignore
import { MerkleTree } from '../utils/merkleTree'; // MerkleTree.js
import merkle from '../utils/merkle.json'; // merkle
import hre from "hardhat"

import { Barretenberg, Fr } from '@aztec/bb.js';

import { PublicClient, WalletClient, pad, fromHex, hashMessage, http, recoverPublicKey, toHex } from 'viem';

import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir }  from '@noir-lang/noir_js';
import { CompiledCircuit, ProofData } from "@noir-lang/types"
import circuit from "../circuits/main/target/stealthdrop.json"

import { expect } from 'chai';

class Airdrop {
  public address : `0x${string}`= "0x";

  constructor(
    private _hashedMessage : `0x${string}`, 
    private _verifierAddress: string, 
    public merkleTreeRoot: string, 
    private _amount: string) {
  }

  async deploy () {
    const airdrop = await hre.viem.deployContract('Ad' as never, [
      this.merkleTreeRoot,
      this._hashedMessage,
      this._verifierAddress,
      '3500000000000000000000',
    ])
    this.address = airdrop.address;
  }

  async contract() {
    return await hre.viem.getContractAt('Ad', this.address)
  }
}

describe('Setup', () => {
  let publicClient : PublicClient;
  
  let merkleTree: MerkleTree;
  let bb : Barretenberg;
  let airdrop : Airdrop;
  let messageToHash : `0x${string}`= '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';
  let hashedMessage: `0x${string}`;

  before(async () => {
    publicClient = await hre.viem.getPublicClient();
  
    const verifier = await hre.viem.deployContract('UltraVerifier');
    console.log(`Verifier deployed to ${verifier.address}`);


    // Setup merkle tree
    merkleTree = new MerkleTree(parseInt(merkle.depth));
    await merkleTree.initialize(merkle.addresses.map(addr => addr));

    hashedMessage = hashMessage(messageToHash, "hex"); // keccak of "signthis"

    airdrop = new Airdrop(hashedMessage, verifier.address, merkleTree.root().toString(), '3500000000000000000000');
    await airdrop.deploy();

    console.log(`Airdrop deployed to ${airdrop.address}`);

  });

  describe('Airdrop tests', () => {
    let user1: WalletClient;
    let user2: WalletClient;
    let claimer1: WalletClient;
    let claimer2: WalletClient;

    let backend : BarretenbergBackend;
    let noir : Noir;

    let naughtyInputMerkleTree : any;

    before(async () => {
      // only user1 is an eligible user
      ([user1, user2, claimer1, claimer2] = await hre.viem.getWalletClients());
      backend = new BarretenbergBackend(circuit as unknown as CompiledCircuit, { threads: 8 });
      noir = new Noir(circuit as unknown as CompiledCircuit, backend);

    });

    const getClaimInputs = async ({user} : { user: WalletClient }) => {

      const leaf = user.account!.address;
      const index = merkleTree.getIndex(leaf);
      const signature = await user.signMessage({ account: user.account!.address, message: messageToHash })

      const pedersen = await merkleTree.getPedersen()
      const signatureBuffer = fromHex(signature as `0x${string}`, "bytes").slice(0, 64)

      const frArray: Fr[] = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));

      const nullifier = await pedersen(frArray)
      const pubKey = await recoverPublicKey({hash: hashedMessage, signature});

      const proof = await merkleTree.proof(index)
      return {
          pub_key: [...fromHex(pubKey, "bytes").slice(1)],
          signature: [...fromHex(signature as `0x${string}`, "bytes").slice(0, 64)],
          hashed_message: [...fromHex(hashedMessage, "bytes")],
          nullifier : nullifier.toString(),
          merkle_path : proof.pathElements.map(x => x.toString()),
          index: index,
          merkle_root : merkleTree.root().toString() as `0x${string}`,
          claimer_priv: claimer1.account!.address,
          claimer_pub: claimer1.account!.address,
      };
    };

    describe("Eligible user", () => {
      let proof : ProofData;

      it("Generates a valid claim", async () => {
        const inputs = await getClaimInputs({ user: user1 });
        proof = await noir.generateFinalProof(inputs)

        const { merkle_path, index, merkle_root } = inputs;
        naughtyInputMerkleTree = { merkle_path, index, merkle_root }
      })

      it("Verifies a valid claim off-chain", async () => {
        const verification = await noir.verifyFinalProof(proof);
        expect(verification).to.be.true;
      })

      // ON-CHAIN VERIFICATION FAILS, CHECK https://github.com/noir-lang/noir/issues/3245
      it.skip("Verifies a valid claim on-chain", async () => {
        const { nullifier } = await getClaimInputs({ user: user1 });
        const ad = await airdrop.contract();

        await ad.write.claim([toHex(proof.proof), nullifier as `0x${string}`], { account: claimer1.account!.address });

      })
    })


    describe("Uneligible user", () => {
      let proof : ProofData;

      it("Fails to generate a valid claim", async () => {
        try {
          // give it a genuine signature...
          const signature = await user2.signMessage({ account: user2.account!.address, message: messageToHash })
          const pedersen = await merkleTree.getPedersen()
          const signatureBuffer = fromHex(signature as `0x${string}`, "bytes").slice(0, 64)
          const frArray: Fr[] = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));
          const nullifier = await pedersen(frArray)
          const pubKey = await recoverPublicKey({hash: hashedMessage, signature});

          // ...but give it a fake merkle path
          const { merkle_path, index, merkle_root } = naughtyInputMerkleTree;
          const naughtyInputs = {
            pub_key: [...fromHex(pubKey, "bytes").slice(1)],
            signature: [...fromHex(signature as `0x${string}`, "bytes").slice(0, 64)],
            hashed_message: [...fromHex(hashedMessage, "bytes")],
            nullifier : nullifier.toString(),
            merkle_path,
            index,
            merkle_root,
            claimer_priv: claimer1.account!.address,
            claimer_pub: claimer1.account!.address,
          };

          proof = await noir.generateFinalProof(naughtyInputs)
        
        } catch(err: any) {
          expect(err.message).to.equal("Circuit execution failed: Error: Cannot satisfy constraint");
        }
      })

      it("Fails to front-run the on-chain transaction with a invalid claimer", async () => {
        // ON-CHAIN VERIFICATION FAILS
      })

    })
  });
});
