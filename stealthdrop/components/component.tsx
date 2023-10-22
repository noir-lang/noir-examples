import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import React from 'react';

import { Fr } from '@aztec/bb.js';
import { MerkleTree } from '../utils/merkleTree';
import { fromHex, hashMessage, recoverPublicKey } from 'viem';
import merkle from '../test/merkle.json'; // merkle

import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir }  from '@noir-lang/noir_js';
import { CompiledCircuit, ProofData } from "@noir-lang/types"
import { useAccount, useConnect, useWalletClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import circuit from "../circuits/target/stealthdrop.json"

function Component() {
  const [proof, setProof] = useState<ProofData>();
  const [noir, setNoir] = useState<Noir | null>(null);
  const [backend, setBackend] = useState<BarretenbergBackend | null>(null);
  const [storedSignature, setStoredSignature] = useState<{account: string, signature: string | undefined}>();
  const [availableAddresses, setAvailableAddresses] = useState<`0x${string}`[]>()
  const [merkleTree, setMerkleTree] = useState<MerkleTree>();

  const { data: walletClient, status: walletConnStatus } = useWalletClient()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  let messageToHash = '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';

  const signData = async (acc: string) => {
    const signature = await walletClient?.signMessage({ account: acc as `0x${string}`, message: messageToHash })
    setStoredSignature({ signature, account: acc });
  }

  const claim = async (acc: string) => {
    const generateClaim = new Promise(async (resolve, reject) => {
      const hashedMessage = hashMessage(messageToHash, "hex"); // keccak of "signthis"
      const { account, signature } = storedSignature!
      const index = merkleTree!.getIndex(Fr.fromString(account));
      const pedersenBB = await merkleTree!.getBB()
      const signatureBuffer = fromHex(signature as `0x${string}`, "bytes").slice(0, 64)
      const frArray: Fr[] = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));
      const nullifier = await pedersenBB.pedersenPlookupCommit(frArray)
      const pubKey = await recoverPublicKey({hash: hashedMessage, signature: signature as `0x${string}`});
      const merkleProof = await merkleTree!.proof(index)

      const inputs = {
          pub_key: [...fromHex(pubKey, "bytes").slice(1)],
          signature: [...fromHex(signature as `0x${string}`, "bytes").slice(0, 64)],
          hashed_message: [...fromHex(hashedMessage, "bytes")],
          nullifier : nullifier.toString(),
          merkle_path : merkleProof.pathElements.map(x => x.toString()),
          index: index,
          merkle_root : merkleTree!.root().toString() as `0x${string}`,
          claimer_priv: acc,
          claimer_pub: acc,
      };

      const proof = await noir!.generateFinalProof(inputs)
      setProof(proof)
      resolve(proof)
    })

    toast.promise(generateClaim, {
      pending: 'Calculating proof...',
      success: 'Proof calculated!',
      error: 'Error calculating proof',
    });
  };

  const verifyProof = async () => {
    const verifyOffChain = new Promise(async (resolve, reject) => {
      const verification = await noir!.verifyFinalProof(proof!);
      resolve(verification)
    })


    toast.promise(verifyOffChain, {
      pending: 'Verifying proof off-chain...',
      success: 'Proof verified off-chain!',
      error: 'Error verifying proof',
    });
  };

  // Verifier the proof if there's one in state
  useEffect(() => {
    if (proof) {
      console.log("verify")
      verifyProof();
    }
  }, [proof]);

  useEffect(() => {
    if (!backend || !noir) {
      const backend = new BarretenbergBackend(circuit as unknown as CompiledCircuit, { threads: 8 })
      setBackend(backend)

      const noir = new Noir(circuit as unknown as CompiledCircuit, backend)
      setNoir(noir)
    }
  }, [proof]);


  const initAddresses = async () => {
    const addresses = await walletClient?.getAddresses()
    setAvailableAddresses(addresses || [])
  }

  useEffect(() => {
    if (isConnected) {
      initAddresses();
    }
  }, [walletConnStatus])


  const initMerkleTree = async () => {
    const initMerkleTree = new Promise(async (resolve, reject) => {
      const merkleTree = new MerkleTree(4);
      await merkleTree.initialize(merkle.map(addr => Fr.fromString(addr)));
      setMerkleTree(merkleTree);
      resolve(merkleTree)
    })

    await toast.promise(initMerkleTree, {
      pending: 'Setting up merkle tree...',
      success: 'Merkle tree ready!',
      error: 'Error creating merkle tree',
    });
  }

  useEffect(() => {
    if (!merkleTree) {
      initMerkleTree();
    }
  }, [merkleTree])

  return (
    <div className="gameContainer">
      <h1>Stealthdrop</h1>
      <ol>
        <li>Connect both the accounts you want to use</li>
        <li>Sign with your elligible account</li>
        <li>Switch to the receiver wallet</li>
        <li>Generate proof</li>
        <li>Send the transaction</li>
      </ol>
      <br/>
      {availableAddresses && availableAddresses.map(acc => <><button onClick={() => signData(acc)}>Sign with connected account: {acc}</button><br/></>)}
      <br/>
      {storedSignature && storedSignature.account && <p>Saved signature: {storedSignature!.signature} for account {storedSignature!.account}</p>}

      {storedSignature && availableAddresses && availableAddresses.map(acc => <><button onClick={() => claim(acc)}>Claim with connected account: {acc}</button><br/></>)}
    </div>
  );
}

export default Component;
