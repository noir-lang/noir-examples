import { fromHex, recoverAddress, recoverPublicKey, toHex } from 'viem';
import { useContext, useEffect, useState } from 'react';
import { useProver } from './useProver.ts';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useWriteContract, useAccount } from 'wagmi';
import addresses from '../../../../utils/addresses.json' with { type: 'json' };
import abi from '../../../../artifacts/contracts/AD.sol/AD.json' with { type: 'json' };
import { type PlumeSignature } from '../../../../types.ts';
import { publicKeyToAddress } from 'viem/accounts';
import { MESSAGE_TO_HASH } from '../../../../utils/const.ts';

export function useClaim(plume: PlumeSignature | undefined, sender: `0x${string}`) {
  const [inputs, setInputs] = useState<any>();
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const merkleTree = useContext(MerkleTreeContext);
  const { prove, proof, setProof, status: proofStatus, setStatus } = useProver();

  const { writeContract, status: writeStatus, reset: resetWrite } = useWriteContract();
  const { data, error, status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });
  const [inputCalculationStatus, setInputCalculationStatus] = useState<
    'idle' | 'generating' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    if (!proof || !sender) return;

    writeContract(
      {
        address: addresses.ad as `0x${string}`,
        abi: abi.abi,
        functionName: 'claim',
        args: [
          toHex(proof.proof),
          toHex(Uint8Array.from(inputs.nullifier_x), { size: 32 }),
          toHex(Uint8Array.from(inputs.nullifier_y), { size: 32 }),
        ],
        account: sender,
      },
      {
        onSuccess: data => {
          setTxHash(data);
        },
        onError: error => {
          console.error(error);
        },
      },
    );
  }, [proof, sender]);

  const claim = async () => {
    if (!plume || !sender || !merkleTree) return;

    const index = merkleTree.indexOf(
      BigInt(publicKeyToAddress(plume.uncompressedPublicKey as `0x${string}`)),
    );
    const proof = merkleTree.generateProof(index);
    const messageBytes = MESSAGE_TO_HASH.split('').map((s, i) => MESSAGE_TO_HASH.charCodeAt(i));

    const pubKey = plume.uncompressedPublicKey?.slice(2);
    const newInputs = {
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
      claimer_priv: sender,
    };
    setInputs(newInputs);

    prove(newInputs);
  };

  const reset = () => {
    setStatus('idle');
    setInputCalculationStatus('idle');
    setProof(undefined);
    setInputs(undefined);
    setTxHash(undefined);
    resetWrite();
  };

  return { claim, proofStatus, writeStatus, inputCalculationStatus, txStatus, proof, reset };
}
