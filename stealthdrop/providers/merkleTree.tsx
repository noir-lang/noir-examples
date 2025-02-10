import React, { createContext, useEffect, useMemo, useState } from 'react';
import { LeanIMT, LeanIMTHashFunction } from '@zk-kit/lean-imt';
import merkle from '../utils/mt/merkle.json' with { type: 'json' };
import { toast } from 'react-toastify';

export const MerkleTreeContext = createContext<LeanIMT | null>(null);

export function MerkleTreeProvider({ children }: { children: React.ReactNode }) {
  const [merkleTree, setMerkleTree] = useState<LeanIMT | null>(null);

  useEffect(() => {
    if (merkleTree) return;

    const initializeTree = async () => {
      const { poseidon } = await import('../utils/bb.ts');
      const tree = new LeanIMT(poseidon);

      const initialLeaves = merkle.addresses.map(addr => BigInt(addr));
      const t = toast.loading('Starting...');
      tree.insertMany(initialLeaves);
      toast.update(t, {
        render: 'Merkle Tree initialized',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
      setMerkleTree(tree);
    };
    initializeTree();
  }, [merkle]);

  if (!merkleTree) return <div>Loading...</div>;

  return <MerkleTreeContext.Provider value={merkleTree}>{children}</MerkleTreeContext.Provider>;
}
