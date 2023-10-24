import React, { createContext, useEffect, useMemo, useState } from "react";
import { MerkleTree } from '../utils/merkleTree';
import merkle from '../utils/merkle.json'; // merkle
import { Fr } from '@aztec/bb.js';
import { toast } from "react-toastify";

export const MerkleTreeContext = createContext<MerkleTree | null>(null);

export function MerkleTreeProvider({ children }) {
    const [merkleTree, setMerkleTree] = useState<MerkleTree | null>(null);

    useEffect(() => {
        const tree = new MerkleTree(parseInt(merkle.depth))
        const initializeTree = async () => {
            const initialLeaves = merkle.addresses.map(addr => Fr.fromString(addr));
            await toast.promise(tree.initialize(initialLeaves), {
                pending: 'Starting...',
            });

            setMerkleTree(tree);
        }
        initializeTree();
    }, [merkle])

    if (!merkleTree) return <></>
    
    return (
        <MerkleTreeContext.Provider value={merkleTree}>
            {children}
        </MerkleTreeContext.Provider>
    );
}
