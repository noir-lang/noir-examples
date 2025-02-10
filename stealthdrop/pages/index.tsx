import React, { useState } from 'react';
import SignButton from '../components/signButton.tsx';
import { useConnectAccount } from '../hooks/useConnectAccount.tsx';
import { useAccount, useGasPrice } from 'wagmi';
import { MerkleTreeProvider } from '../providers/merkleTree.tsx';
import { ClaimButton } from '../components/claimButton.tsx';
import StealthDropApp from '../components/StealthDrop/StealthDropApp.tsx';

export default function Page() {
  const [signature, setSignature] = useState<string | null>(null);
  const connectButton = useConnectAccount();
  const { isConnected } = useAccount();

  return (
    <MerkleTreeProvider>
      <div className="gameContainer">
        <StealthDropApp />
        {connectButton}
        {isConnected && <SignButton setSignature={setSignature} />}
        {signature && <ClaimButton signature={signature as `0x${string}`} />}
      </div>
    </MerkleTreeProvider>
  );
}
