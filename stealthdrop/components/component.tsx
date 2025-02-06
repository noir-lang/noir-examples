import { useState, useEffect, useMemo, useContext } from 'react';

import { toast } from 'react-toastify';

import { fromHex, hashMessage, recoverPublicKey, toHex } from 'viem';

import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import { useAccount, useConnect, useWalletClient } from 'wagmi';
import { MerkleTreeContext } from '../components/merkleTree';

import circuit from '../noir/target/stealthdrop.json';
import React from 'react';

function useProver({ inputs }) {
  const [proof, setProof] = useState<ProofData>();
  const noirenberg = useMemo(async () => {
    const { UltraHonkBackend } = await import('@aztec/bb.js');

    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 8 });
    const noir = new Noir(circuit as unknown as CompiledCircuit);
    return { noir, backend };
  }, [circuit]);

  useEffect(() => {
    if (!proof) return;

    const verify = async () => {
      const { noir, backend } = await noirenberg;
      const verification = await toast.promise(backend.verifyProof(proof), {
        pending: 'Verifying proof off-chain...',
        success: 'Proof verified off-chain!',
        error: 'Error verifying proof',
      });
      return verification;
    };

    verify();
  }, [proof]);

  useEffect(() => {
    if (!inputs) return;

    const prove = async () => {
      const { noir, backend } = await noirenberg;

      const { witness } = await noir.execute(inputs);
      const proof = await toast.promise(backend.generateProof(witness), {
        pending: 'Calculating proof...',
        success: 'Proof calculated!',
        error: 'Error calculating proof',
      });
      setProof(proof);
      return proof;
    };

    prove();
  }, [inputs]);

  return;
}

function Component() {
  const [storedSignature, setStoredSignature] = useState<{
    account: string;
    signature: string | undefined;
  }>();
  const [availableAddresses, setAvailableAddresses] = useState<`0x${string}`[]>([]);
  const merkleTreeContext = useContext(MerkleTreeContext);
  const merkleTree = merkleTreeContext?.merkleTree;

  const [inputs, setInputs] = useState<any>();

  const { data: walletClient, status: walletConnStatus } = useWalletClient();
  const { isConnected } = useAccount();

  useProver({ inputs });

  let messageToHash = 'signthis';

  const signData = async (acc: string) => {
    const signature = await walletClient?.signMessage({
      account: acc as `0x${string}`,
      message: messageToHash,
    });
    setStoredSignature({ signature, account: acc });
  };

  const claim = async (acc: string) => {
    const hashedMessage = hashMessage(messageToHash, 'hex');
    const { account, signature } = storedSignature!;
    const index = merkleTree!.indexOf(BigInt(account));
    const signatureBuffer = fromHex(signature as `0x${string}`, 'bytes').slice(0, 64);

    const { BarretenbergSync, Fr } = await import('@aztec/bb.js');
    const frArray = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));
    const bb = await BarretenbergSync.new();

    const nullifier = bb.poseidon2Hash(frArray);
    const pubKey = await recoverPublicKey({
      hash: hashedMessage,
      signature: signature as `0x${string}`,
    });

    const proof = merkleTree!.generateProof(index);

    const inputs = {
      pub_key: [...fromHex(pubKey, 'bytes').slice(1)],
      signature: [...fromHex(signature as `0x${string}`, 'bytes').slice(0, 64)],
      hashed_message: [...fromHex(hashedMessage, 'bytes')],
      nullifier: nullifier.toString(),
      merkle_path: proof.siblings.map(x => toHex(x, { size: 32 })),
      index: index,
      merkle_root: toHex(proof.root, { size: 32 }),
      claimer_priv: acc,
      claimer_pub: acc,
    };
    setInputs(inputs);
  };

  const initAddresses = async () => {
    const addresses = await walletClient?.getAddresses();
    setAvailableAddresses(addresses || []);
  };

  useEffect(() => {
    if (isConnected) {
      initAddresses();
    }
  }, [walletConnStatus]);

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
      {availableAddresses.map(acc => (
        <button key={acc} onClick={() => signData(acc)}>
          Sign with connected account: {acc}
        </button>
      ))}
      {storedSignature && (
        <p>
          Saved signature: {storedSignature!.signature} for account {storedSignature!.account}
        </p>
      )}

      {storedSignature &&
        availableAddresses.map(acc => (
          <>
            <button onClick={() => claim(acc)}>Claim with connected account: {acc}</button>
            <br />
          </>
        ))}
    </div>
  );
}

export default Component;
