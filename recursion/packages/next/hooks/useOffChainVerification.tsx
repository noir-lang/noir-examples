'use client';

import { ProofData } from '@noir-lang/types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Noir } from '@noir-lang/noir_js';

export function useOffChainVerification(noir?: Noir, proofData?: ProofData) {
  useEffect(() => {
    if (!proofData || !noir) return;
    const { proof, publicInputs } = proofData;

    toast.promise(noir.verifyProof({ proof, publicInputs }), {
      pending: 'Verifying recursive proof off-chain',
      success: 'Recursive proof verified off-chain',
      error: 'Error verifying recursive proof off-chain',
    });

    // return () => {
    //   backend.destroy();
    // };
  }, [proofData]);
}
