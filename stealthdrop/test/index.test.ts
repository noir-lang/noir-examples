import { LeanIMT } from '@zk-kit/lean-imt';
import merkle from '../utils/merkle.json' with { type: 'json' }; // merkle
import hre from 'hardhat';
const { viem } = hre;

import { UltraHonkBackend, BarretenbergSync, Fr } from '@aztec/bb.js';

import {
  PublicClient,
  WalletClient,
  pad,
  fromHex,
  hashMessage,
  http,
  recoverPublicKey,
  toHex,
  getAddress,
  Address,
} from 'viem';

import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import circuit from '../noir/target/stealthdrop.json' with { type: 'json' };

import { expect } from 'chai';
import { errorMonitor } from 'events';

class Airdrop {
  public address: `0x${string}` = '0x';

  constructor(
    private hashedMessage: `0x${string}`,
    private verifierAddress: `0x${string}`,
    public merkleTreeRoot: `0x${string}`,
    private amount: string,
  ) {}

  async deploy() {
    const airdrop = await viem.deployContract('AD', [
      this.merkleTreeRoot,
      this.hashedMessage,
      this.verifierAddress,
      '3500000000000000000000',
    ]);
    this.address = airdrop.address;
  }

  async contract() {
    return await viem.getContractAt('AD', this.address);
  }
}

const bbSync = await BarretenbergSync.new();

const poseidon = (a: bigint, b: bigint) => {
  const hash = bbSync.poseidon2Hash([new Fr(a), new Fr(b)]);
  return BigInt(hash.toString());
};

const primedMerkleTree = new LeanIMT(poseidon);
merkle.addresses.forEach((addr: string) => primedMerkleTree.insert(BigInt(addr)));

let publicClient: PublicClient;
let airdrop: Airdrop;
let messageToHash = 'signthis';
let hashedMessage: `0x${string}`;

let user1: WalletClient;
let user2: WalletClient;
let claimer1: WalletClient;
let claimer2: WalletClient;

let backend: UltraHonkBackend;
let noir: Noir;

before(async () => {
  [user1, user2, claimer1, claimer2] = await hre.viem.getWalletClients();
  publicClient = await viem.getPublicClient();

  const verifier = await viem.deployContract('HonkVerifier');
  console.log(`Verifier deployed to ${verifier.address}`);

  // Setup merkle tree
  const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
  merkleTree.insert(BigInt(user1.account!.address)); // only user1 is eligible

  hashedMessage = hashMessage(messageToHash);

  airdrop = new Airdrop(
    hashedMessage,
    verifier.address,
    toHex(merkleTree.root, { size: 32 }),
    '3500000000000000000000',
  );
  await airdrop.deploy();

  ({ noir, backend } = await hre.noir.getCircuit('stealthdrop'));
  console.log(`Airdrop deployed to ${airdrop.address}`);
});

const getClaimInputs = async ({
  merkleTree,
  user,
}: {
  merkleTree: LeanIMT;
  user: WalletClient;
}) => {
  const leaf = user.account!.address;

  const index = merkleTree.indexOf(BigInt(leaf));

  const signature = await user.signMessage({
    account: user.account!.address,
    message: messageToHash,
  });
  const signatureBuffer = fromHex(signature as `0x${string}`, 'bytes').slice(0, 64);
  const frArray: Fr[] = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));
  const nullifier = bbSync.poseidon2Hash(frArray);
  const pubKey = await recoverPublicKey({ hash: hashedMessage, signature });

  const proof = merkleTree.generateProof(index);
  const inputs = {
    pub_key: [...fromHex(pubKey, 'bytes').slice(1)],
    signature: [...fromHex(signature as `0x${string}`, 'bytes').slice(0, 64)],
    hashed_message: [...fromHex(hashedMessage, 'bytes')],
    nullifier: nullifier.toString(),
    merkle_path: proof.siblings.map(x => toHex(x, { size: 32 })),
    index: index,
    merkle_root: toHex(proof.root, { size: 32 }),
    claimer_priv: claimer1.account!.address,
    claimer_pub: claimer1.account!.address,
  };
  return inputs;
};

describe('Eligible user', () => {
  let proof: ProofData;

  it('Generates a valid claim - off-chain', async () => {
    const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    merkleTree.insert(BigInt(user1.account!.address));

    const inputs = await getClaimInputs({ merkleTree, user: user1 });
    const { witness } = await noir.execute(inputs);
    proof = await backend.generateProof(witness);

    const verification = await backend.verifyProof(proof);
    expect(verification).to.be.true;
  });

  it('Verifies a valid claim - on-chain', async () => {
    const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    merkleTree.insert(BigInt(user1.account!.address));

    const inputs = await getClaimInputs({ merkleTree, user: user1 });
    const { witness } = await noir.execute(inputs);
    proof = await backend.generateProof(witness, { keccak: true });
    proof.proof = proof.proof.slice(4);

    const ad = await airdrop.contract();
    await ad.write.claim([toHex(proof.proof), inputs.nullifier as `0x${string}`], {
      account: claimer1.account!.address,
    });
  });
});

describe('Uneligible user', () => {
  let proof: ProofData;
  let inputs: any;
  let validRoot: `0x${string}`;

  before(async () => {
    // now we will trick our MT by instead of user1, we will add user2
    // so we get a valid merkle tree for the inputs
    // but will then feed the correct tree (without user2) into the contract
    const naughtyMT = LeanIMT.import(poseidon, primedMerkleTree.export());
    naughtyMT.insert(BigInt(user2.account!.address));

    inputs = await getClaimInputs({ merkleTree: naughtyMT, user: user2 });
  });

  it('Fails to generate a valid claim', async () => {
    try {
      // this should fail, because even though user2 could generate a valid merkle tree proof
      // (by inserting their own address into the tree)
      // the contract will use the stored "validRoot" (the original tree, without user2)
      // so the proof will be invalid
      const { witness } = await noir.execute(inputs);
      proof = await backend.generateProof(witness, { keccak: true });

      const ad = await airdrop.contract();

      await ad.write.claim([toHex(proof.proof), inputs.nullifier as `0x${string}`], {
        account: claimer1.account!.address,
      });
    } catch (err: any) {
      expect(err.message).to.include('SumcheckFailed');
    }
  });

  it('Fails to front-run the on-chain transaction with a invalid claimer', async () => {
    try {
      const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
      merkleTree.insert(BigInt(user1.account!.address));

      const inputs = await getClaimInputs({ merkleTree, user: user1 });
      const { witness } = await noir.execute(inputs);
      proof = await backend.generateProof(witness, { keccak: true });

      const ad = await airdrop.contract();

      // user1 generated a correct proof, but a nasty node takes the tx and tries to front-run it
      await ad.write.claim([toHex(proof.proof), inputs.nullifier as `0x${string}`], {
        account: claimer2.account!.address,
      });
    } catch (err: any) {
      expect(err.message).to.include('SumcheckFailed');
    }
  });
});
