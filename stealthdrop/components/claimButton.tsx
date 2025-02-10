import { hashMessage } from 'viem';
import { MESSAGE_TO_HASH } from '../utils/const.ts';
import { useClaim } from '../hooks/useClaimer.ts';
import { MouseEvent } from 'react';

interface ClaimButtonProps {
  signature: `0x${string}`;
}

export function ClaimButton({ signature }: ClaimButtonProps) {
  const hashedMessage = hashMessage(MESSAGE_TO_HASH, 'hex') as `0x${string}`;
  const claim = useClaim(signature, hashedMessage);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await claim();
  };

  return signature && <button onClick={handleClick}>Claim</button>;
}
