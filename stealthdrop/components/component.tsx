import { useState, useEffect, useMemo, useContext } from 'react';

import { toast } from 'react-toastify';
import React from 'react';

import { fromHex, hashMessage, recoverPublicKey } from 'viem';

import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir }  from '@noir-lang/noir_js';
import { CompiledCircuit, ProofData } from "@noir-lang/types"
import { useAccount, useConnect, useWalletClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MerkleTreeContext } from "../components/merkleTree";

import circuit from "../circuits/target/stealthdrop.json"
import { Fr } from '@aztec/bb.js';

function useProver({ inputs }) {
  const [proof, setProof] = useState<ProofData>();
  const noir = useMemo(() => {
    const backend = new BarretenbergBackend(circuit as unknown as CompiledCircuit, { threads: 8 })
    return(new Noir(circuit as unknown as CompiledCircuit, backend))
  }, [circuit])

  useEffect(() => {
    if (!proof) return;

    const verify = async () => {
      const verification = await toast.promise(noir.verifyFinalProof(proof), {
        pending: 'Verifying proof off-chain...',
        success: 'Proof verified off-chain!',
        error: 'Error verifying proof',
      })
      return verification
    }

    verify();
  }, [proof])

  useEffect(() => {
    if (!inputs) return;

    const prove = async () => {
      const proof = await toast.promise(noir.generateFinalProof(inputs), {
        pending: 'Calculating proof...',
        success: 'Proof calculated!',
        error: 'Error calculating proof',
      });
      setProof(proof)
      return proof
    }

    prove();
  }, [inputs])

  return;
}

function Component() {
  const [storedSignature, setStoredSignature] = useState<{account: string, signature: string | undefined}>();
  const [availableAddresses, setAvailableAddresses] = useState<`0x${string}`[]>([])
  const merkleTree = useContext(MerkleTreeContext);
  
  const [inputs, setInputs] = useState<any>();

  const { data: walletClient, status: walletConnStatus } = useWalletClient()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  useProver({ inputs });

  let messageToHash = '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';

  const signData = async (acc: string) => {
    const signature = await walletClient?.signMessage({ account: acc as `0x${string}`, message: messageToHash })
    setStoredSignature({ signature, account: acc });
  }

  const claim = async (acc: string) => {
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
    setInputs(inputs)
  };

  const initAddresses = async () => {
    const addresses = await walletClient?.getAddresses()
    setAvailableAddresses(addresses || [])
  }

  useEffect(() => {
    if (isConnected) {
      initAddresses();
    }
  }, [walletConnStatus])


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
      {availableAddresses.map(acc => <button onClick={() => signData(acc)}>Sign with connected account: {acc}</button>)}
      {storedSignature && <p>Saved signature: {storedSignature!.signature} for account {storedSignature!.account}</p>}

      {storedSignature && availableAddresses.map(acc => <><button onClick={() => claim(acc)}>Claim with connected account: {acc}</button><br/></>)}
    </div>
  );
}

export default Component;
