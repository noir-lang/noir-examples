import React, { useState } from 'react';
import SignButton from '../components/signButton.tsx';
import { useConnectAccount } from '../hooks/useConnectAccount.tsx';
import { useAccount, useGasPrice } from 'wagmi';
import { MerkleTreeProvider } from '../providers/merkleTree.tsx';
import { ClaimButton } from '../components/claimButton.tsx';

export default function Page() {
  const [signature, setSignature] = useState<string | null>(null);
  const connectButton = useConnectAccount();
  const { isConnected } = useAccount();

  return (
    <MerkleTreeProvider>
      <div className="gameContainer">
        <h1>Stealthdrop</h1>
        <ol>
          <li>Connect both the accounts you want to use</li>
          <li>Sign with your elligible account</li>
          <li>Switch to the receiver wallet</li>
          <li>Generate proof</li>
          <li>Send the transaction</li>
        </ol>
        {connectButton}
        {isConnected && <SignButton setSignature={setSignature} />}
        {signature && <ClaimButton signature={signature as `0x${string}`} />}
      </div>
    </MerkleTreeProvider>
  );
}
