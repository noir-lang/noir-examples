import React, { createContext, useEffect, useMemo, useState } from 'react';
import { LeanIMT, LeanIMTHashFunction } from '@zk-kit/lean-imt';
import merkle from '../utils/merkle.json'; // merkle
import { toast } from 'react-toastify';

export const MerkleTreeContext = createContext<{
  merkleTree: LeanIMT | null;
} | null>(null);

export function MerkleTreeProvider({ children }) {
  const [merkleTree, setMerkleTree] = useState<LeanIMT | null>(null);

  useEffect(() => {
    const initializeTree = async () => {
      const { BarretenbergSync, Fr } = await import('@aztec/bb.js');
      const bb = await BarretenbergSync.new();

      const hashPair = (a: bigint, b: bigint) =>
        BigInt(bb.poseidon2Hash([new Fr(a), new Fr(b)]).toString());
      const tree = new LeanIMT(hashPair);

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

  return <MerkleTreeContext.Provider value={{ merkleTree }}>{children}</MerkleTreeContext.Provider>;
}
