import { useState, useEffect, useContext } from 'react';

import { hashMessage } from 'viem';

import { useAccount, useSignMessage } from 'wagmi';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import { MESSAGE_TO_HASH } from '../utils/const.ts';
import React from 'react';

export default function SignButton({
  setSignature,
}: {
  setSignature: (signature: `0x${string}` | null) => void;
}) {
  const [isEligible, setIsEligible] = useState(false);
  const merkleTree = useContext(MerkleTreeContext);

  const account = useAccount();
  const { signMessage, data: signature } = useSignMessage();

  useEffect(() => {
    if (!signature) return;
    setSignature(signature as `0x${string}`);
  }, [signature]);

  useEffect(() => {
    if (!account.address || !merkleTree) return;

    const index = merkleTree.indexOf(BigInt(account.address!));
    if (index === -1) {
      setIsEligible(false);
    } else {
      setIsEligible(true);
    }
  }, [account]);

  return (
    <div>
      {isEligible ? (
        <button key={account.address} onClick={() => signMessage({ message: MESSAGE_TO_HASH })}>
          Sign
        </button>
      ) : (
        <button disabled key={account.address}>
          Switch to an elligible account!
        </button>
      )}
    </div>
  );
}
