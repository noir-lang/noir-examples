import React from 'react';
import { MerkleTreeProvider } from '../providers/merkleTree.tsx';
import StealthDropApp from '../components/StealthDrop/StealthDropApp.tsx';

export default function Page() {
  return (
    <MerkleTreeProvider>
      <div className="gameContainer">
        <StealthDropApp />
      </div>
    </MerkleTreeProvider>
  );
}
