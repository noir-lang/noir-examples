import React, { createContext, useEffect, useMemo, useState } from 'react';
import { LeanIMT, LeanIMTHashFunction } from '@zk-kit/lean-imt';
import merkle from '../../../../utils/mt/merkle.json' with { type: 'json' };

export const MerkleTreeContext = createContext<LeanIMT | null>(null);

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#1C1326] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="text-white">Stealth</span>
          <span className="text-[#9D7BB5]">Drop</span>
        </h1>
        <p className="text-gray-400 text-center">Private zk-SNARK Airdrops</p>
      </div>

      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#E4BAFF] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#9D7BB5] border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
      </div>

      <p className="mt-8 text-[#E4BAFF] text-lg">Initializing Merkle Tree...</p>
      <p className="mt-2 text-gray-400 text-sm">This might take a moment</p>
    </div>
  );
}

export function MerkleTreeProvider({ children }: { children: React.ReactNode }) {
  const [merkleTree, setMerkleTree] = useState<LeanIMT | null>(null);

  useEffect(() => {
    if (merkleTree) return;

    const initializeTree = async () => {
      const { poseidon } = await import('../../../../utils/bb.ts');
      const tree = new LeanIMT(poseidon);

      const initialLeaves = merkle.addresses.map(addr => BigInt(addr));
      tree.insertMany(initialLeaves);
      setMerkleTree(tree);
    };
    initializeTree();
  }, [merkle]);

  if (!merkleTree) return <LoadingScreen />;

  return <MerkleTreeContext.Provider value={merkleTree}>{children}</MerkleTreeContext.Provider>;
}

// Add this to your global CSS or tailwind.config.js
// @keyframes spin-reverse {
//   from {
//     transform: rotate(360deg);
//   }
//   to {
//     transform: rotate(0deg);
//   }
// }
