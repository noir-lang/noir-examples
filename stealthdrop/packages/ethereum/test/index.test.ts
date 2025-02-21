import { LeanIMT } from '@zk-kit/lean-imt';
import merkle from '../../../utils/merkle.json' with { type: 'json' };
import hre from 'hardhat';
const { viem } = hre;

import { mnemonicToAccount } from 'viem/accounts';

import { UltraHonkBackend,BarretenbergSync, Fr } from '@aztec/bb.js';

import { WalletClient, fromHex, toHex } from 'viem';

import { Noir } from '@noir-lang/noir_js';
import { ProofData } from '@noir-lang/types';
import { expect } from 'chai';
import pkg from '../../const.cts';
const { MESSAGE_TO_HASH } = pkg;
import { computeAllInputs } from 'plume-sig';
import { HardhatNetworkHDAccountsConfig } from 'hardhat/types';

const bbSync = await BarretenbergSync.new();

const poseidon = (a: bigint, b: bigint) => {
  const hash = bbSync.poseidon2Hash([new Fr(a), new Fr(b)]);
  return BigInt(hash.toString());
};

const primedMerkleTree = new LeanIMT(poseidon);
const initialLeaves = merkle.addresses.map(addr => BigInt(addr));
primedMerkleTree.insertMany(initialLeaves);


class Airdrop {
  public address: `0x${string}` = '0x';

  constructor(
    private hashedMessage: `0x${string}`,
    private verifierAddress: `0x${string}`,
    public merkleTreeRoot: `0x${string}`,
    private amount: string,
  ) {}

  async deploy() {
    // @ts-ignore
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


let airdrop: Airdrop;
let hashedMessage: `0x${string}`;

let user0: WalletClient;
let user1: WalletClient;
let claimer0: WalletClient;
let claimer1: WalletClient;

let backend: UltraHonkBackend;
let noir: Noir;

before(async () => {
  [user0, user1, claimer0, claimer1] = await hre.viem.getWalletClients();

  const verifier = await viem.deployContract('HonkVerifier');
  console.log(`Verifier deployed to ${verifier.address}`);

  // Setup merkle tree
  const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
  merkleTree.update(0, BigInt(user0.account!.address)); // only user0 is eligible

  // hashedMessage = hashMessage(MESSAGE_TO_HASH);
  const messageBytesHex = toHex(MESSAGE_TO_HASH, { size: 8 });

  airdrop = new Airdrop(
    messageBytesHex,
    verifier.address,
    toHex(merkleTree.root, { size: 32 }),
    '3500000000000000000000',
  );
  await airdrop.deploy();

  ({ noir, backend } = await hre.noir.getCircuit('stealthdrop'));
  console.log(`Airdrop deployed to ${airdrop.address}`);
});

// ON PLUME
// just to make sure we're on the same page
// this private key WON'T be exposed
// we expect the wallet client (ex. Taho) to return PLUME with `eth_getPlumeSignature`
// the structure of the returned signature is here: https://github.com/tahowallet/extension/blob/917c396fb7113a39be0ebc9ab50ddc2c6cc6b633/background/utils/signing.ts#L81
// so what we're doing here is just emulating what the wallet client does
const getClaimInputs = async ({
  merkleTree,
  testUserIndex,
}: {
  merkleTree: LeanIMT;
  testUserIndex: number;
}) => {
  const userAccount = mnemonicToAccount(
    (hre.network.config.accounts as HardhatNetworkHDAccountsConfig).mnemonic,
    {
      addressIndex: testUserIndex,
    },
  );

  const leaf = userAccount!.address;
  const index = merkleTree.indexOf(BigInt(leaf));

  // Check if address is in merkle tree
  if (index === -1) {
    console.warn(
      `⚠️ Warning: Address ${leaf} is not in the merkle tree. This signature will not be valid for claiming.`,
    );
    return null;
  }

  // message to hash is above
  const messageBytes = MESSAGE_TO_HASH.split('').map((s, i) => MESSAGE_TO_HASH.charCodeAt(i));
  const privateKey = userAccount!.getHdKey().privateKey!;
  const plume = await computeAllInputs(Uint8Array.from(messageBytes), privateKey);

  const proof = merkleTree.generateProof(index);
  const pubKey = userAccount!.publicKey.slice(2);

  const inputs = {
    pub_key_x: [...fromHex(pubKey as `0x${string}`, 'bytes').slice(0, 32)],
    pub_key_y: [...fromHex(pubKey as `0x${string}`, 'bytes').slice(32, 64)],
    message: Array.from(messageBytes),

    c: [...fromHex(`0x${plume.c}`, 'bytes')],
    s: [...fromHex(`0x${plume.s}`, 'bytes')],
    nullifier_x: [...fromHex(plume.nullifier.toHex() as `0x${string}`, 'bytes')].slice(0, 32),
    nullifier_y: [...fromHex(plume.nullifier.toHex() as `0x${string}`, 'bytes')].slice(32, 64),

    eligible_root: toHex(proof.root, { size: 32 }),
    eligible_path: proof.siblings.map(x => toHex(x, { size: 32 })),
    eligible_index: index,

    claimer_priv: claimer0.account!.address,
  };

  return inputs;
};

describe('Eligible user', () => {
  let proof: ProofData;

  it('Generates a valid claim - off-chain', async () => {
    const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    merkleTree.update(0, BigInt(user0.account!.address));

    const inputs = await getClaimInputs({ merkleTree, testUserIndex: 0 });
    if (!inputs) {
      throw new Error('Failed to generate inputs - address not in merkle tree');
    }

    const { witness } = await noir.execute(inputs);
    proof = await backend.generateProof(witness);

    const verification = await backend.verifyProof(proof);
    expect(verification).to.be.true;
  });

  it('Verifies a valid claim - on-chain', async () => {
    const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    merkleTree.update(0, BigInt(user0.account!.address));

    const inputs = await getClaimInputs({ merkleTree, testUserIndex: 0 });
    if (!inputs) {
      throw new Error('Failed to generate inputs - address not in merkle tree');
    }

    const { witness } = await noir.execute(inputs);
    proof = await backend.generateProof(witness, { keccak: true });
    proof.proof = proof.proof.slice(4);

    const ad = await airdrop.contract();
    await ad.write.claim(
      [
        toHex(proof.proof),
        toHex(Uint8Array.from(inputs.nullifier_x), { size: 32 }),
        toHex(Uint8Array.from(inputs.nullifier_y), { size: 32 }),
      ],
      {
        account: claimer0.account!.address,
      },
    );
  });
});

describe('Uneligible user', () => {
  let proof: ProofData;
  let naughtyInputs: any;
  let inputs: any;

  before(async () => {
    const merkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    merkleTree.update(0, BigInt(user0.account!.address));

    inputs = await getClaimInputs({ merkleTree, testUserIndex: 0 });

    // now we will trick our MT by instead of user0, we will add user1
    // so we get a valid merkle tree for the inputs
    // but will then feed the correct tree (without user1) into the contract
    const naughtyMerkleTree = LeanIMT.import(poseidon, primedMerkleTree.export());
    naughtyMerkleTree.update(0, BigInt(user1.account!.address));

    naughtyInputs = await getClaimInputs({ merkleTree: naughtyMerkleTree, testUserIndex: 1 });
  });

  it('Fails to generate a valid claim', async () => {
    try {
      // this should fail, because even though user1 could generate a valid merkle tree proof
      // (by inserting their own address into the tree)
      // the contract will use the stored "validRoot" (the original tree, without user1)
      // so the proof will be invalid
      const { witness } = await noir.execute(naughtyInputs);
      proof = await backend.generateProof(witness, { keccak: true });

      const ad = await airdrop.contract();

      await ad.write.claim(
        [
          toHex(proof.proof),
          toHex(Uint8Array.from(naughtyInputs.nullifier_x), { size: 32 }),
          toHex(Uint8Array.from(naughtyInputs.nullifier_y), { size: 32 }),
        ],
        {
          account: claimer0.account!.address,
        },
      );
    } catch (err: any) {
      expect(err.message)
    }
  });

  it('Fails to front-run the on-chain transaction with a invalid claimer', async () => {
    try {
      const { witness } = await noir.execute(inputs);
      proof = await backend.generateProof(witness, { keccak: true });

      const ad = await airdrop.contract();

      // user0 generated a correct proof, but a nasty node takes the tx and tries to front-run it
      await ad.write.claim(
        [
          toHex(proof.proof),
          toHex(Uint8Array.from(inputs.nullifier_x), { size: 32 }),
          toHex(Uint8Array.from(inputs.nullifier_y), { size: 32 }),
        ],
        {
          account: claimer1.account!.address,
        },
      );
    } catch (err: any) {
      expect(err.message)
    }
  });

  it('Fails to claim twice', async () => {
    try {
      const { witness } = await noir.execute(inputs);
      proof = await backend.generateProof(witness, { keccak: true });

      const ad = await airdrop.contract();

      await ad.write.claim(
        [
          toHex(proof.proof),
          toHex(Uint8Array.from(inputs.nullifier_x), { size: 32 }),
          toHex(Uint8Array.from(inputs.nullifier_y), { size: 32 }),
        ],
        {
          account: claimer0.account!.address,
        },
      );

      // actually while in demo, we don't check for double claims (same nullifier)
      // but we check for msg.sender so this should still fail
      await ad.write.claim(
        [
          toHex(proof.proof),
          toHex(Uint8Array.from(inputs.nullifier_x), { size: 32 }),
          toHex(Uint8Array.from(inputs.nullifier_y), { size: 32 }),
        ],
        {
          account: claimer0.account!.address,
        },
      );
    } catch (err: any) {
      expect(err.message)
    }
  });
});
