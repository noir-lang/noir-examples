import { Account, fromHex, recoverAddress, recoverPublicKey, toHex } from 'viem';
import { useContext, useEffect, useState } from 'react';
import { useProver } from './useProver.ts';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useWriteContract, useAccount } from 'wagmi';
import addresses from '../utils/addresses.json' with { type: 'json' };
import abi from '../artifacts/contracts/AD.sol/AD.json' with { type: 'json' };
import { useSimulateContract } from 'wagmi';

export function useClaim(
  signature: `0x${string}` | undefined,
  hashedMessage: `0x${string}`,
  sender: `0x${string}`,
) {
  const [inputs, setInputs] = useState<any>();
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const merkleTree = useContext(MerkleTreeContext);
  const { prove, proof, setProof, status: proofStatus, setStatus } = useProver();

  const { writeContract, status: writeStatus, reset: resetWrite } = useWriteContract();
  const { data, error, status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    console.log(proof);
    if (!proof || !sender) return;

    console.log('sender', sender);
    console.log('writing');
    console.log([toHex(proof.proof), inputs.nullifier]);
    writeContract(
      {
        address: addresses.ad as `0x${string}`,
        abi: abi.abi,
        functionName: 'claim',
        args: [toHex(proof.proof), inputs.nullifier],
        account: sender,
      },
      {
        onSuccess: data => {
          console.log('success');
          console.log(data);
          setTxHash(data);
        },
        onError: error => {
          console.error(error);
        },
      },
    );
  }, [proof, sender]);

  const claim = async () => {
    if (!signature || !sender || !merkleTree) return;

    const signatureBuffer = fromHex(signature, 'bytes').slice(0, 64);
    const recoveredAddress = await recoverAddress({
      hash: hashedMessage,
      signature: signature,
    });

    console.log('recoveredAddress', recoveredAddress);
    const index = merkleTree.indexOf(BigInt(recoveredAddress));

    const { bbSync, Fr } = await import('../utils/bb.ts');
    const frArray = Array.from(signatureBuffer).map(byte => new Fr(BigInt(byte)));

    const nullifier = bbSync.poseidon2Hash(frArray);
    const pubKey = await recoverPublicKey({
      hash: hashedMessage,
      signature,
    });

    const proof = merkleTree.generateProof(index);

    const newInputs = {
      pub_key: [...fromHex(pubKey, 'bytes').slice(1)],
      signature: [...fromHex(signature, 'bytes').slice(0, 64)],
      hashed_message: [...fromHex(hashedMessage, 'bytes')],
      nullifier: nullifier.toString(),
      merkle_path: proof.siblings.map(x => toHex(x, { size: 32 })),
      index: index,
      merkle_root: toHex(proof.root, { size: 32 }),
      claimer_priv: sender,
      claimer_pub: sender,
    };
    setInputs(newInputs);
    console.log(newInputs);
    prove(newInputs);
  };

  const reset = () => {
    setStatus('idle');
    setProof(undefined);
    setInputs(undefined);
    setTxHash(undefined);
    resetWrite();
  };

  return { claim, proofStatus, writeStatus, txStatus, proof, reset };
}
