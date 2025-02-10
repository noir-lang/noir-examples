import { fromHex, recoverAddress, recoverPublicKey, toHex } from 'viem';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { useProver } from './useProver.ts';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useWriteContract, useAccount } from 'wagmi';
import addresses from '../utils/addresses.json' with { type: 'json' };
import abi from '../artifacts/contracts/AD.sol/AD.json' with { type: 'json' };
import { useSimulateContract } from 'wagmi';

export function useClaim(signature: `0x${string}` | undefined, hashedMessage: `0x${string}`) {
  const [inputs, setInputs] = useState<any>();
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const merkleTree = useContext(MerkleTreeContext);
  const { prove, proof } = useProver();

  const account = useAccount();
  const { writeContract } = useWriteContract();
  const { data, error, status } = useWaitForTransactionReceipt({ hash: txHash });

  // const result = useSimulateContract({
  //   address: addresses.ad as `0x${string}`,
  //   abi: abi.abi,
  //   functionName: 'claim',
  //   args: [toHex(proof.proof), inputs.nullifier],
  // });

  useEffect(() => {
    console.log('status', status);
    if (!txHash || !status) return;

    const toastId = toast.loading('Claiming...');
    if (txHash && status === 'pending') {
      toast.update(toastId, { render: 'Claiming...', isLoading: true });
    } else if (status === 'success') {
      toast.update(toastId, {
        render: 'Claimed!',
        isLoading: false,
        autoClose: 5000,
        type: 'success',
      });
    } else {
      toast.update(toastId, {
        render: 'Error claiming',
        isLoading: false,
        autoClose: 5000,
        type: 'error',
      });
      console.error(error);
      console.log(data);
    }
  }, [status, txHash]);

  useEffect(() => {
    console.log(proof);
    if (!proof || !account.address) return;

    console.log('writing');
    console.log([toHex(proof.proof), inputs.nullifier]);
    writeContract(
      {
        address: addresses.ad as `0x${string}`,
        abi: abi.abi,
        functionName: 'claim',
        args: [toHex(proof.proof), inputs.nullifier],
      },
      {
        onSuccess: data => {
          console.log('success');
          console.log(data);
          setTxHash(data);
        },
        onError: error => {
          toast.error('Error claiming');
          console.error(error);
        },
      },
    );
  }, [proof, account.address]);

  const claim = async () => {
    if (!signature || !account.address || !merkleTree) return;

    const signatureBuffer = fromHex(signature, 'bytes').slice(0, 64);
    const recoveredAddress = await recoverAddress({
      hash: hashedMessage,
      signature: signature,
    });

    if (recoveredAddress.toLowerCase() === account.address.toLowerCase()) {
      toast.error('You probably want to claim with a different account!');
      return;
    }

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
      claimer_priv: account.address,
      claimer_pub: account.address,
    };
    setInputs(newInputs);
    console.log(newInputs);
    await toast.promise(() => prove(newInputs), {
      pending: 'Proving...',
      success: 'Proved!',
      error: 'Error proving',
    });
  };

  return claim;
}
