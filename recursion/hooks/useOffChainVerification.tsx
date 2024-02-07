'use client';

import { ProofData } from '@noir-lang/types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';

export function useOffChainVerification(backend?: BarretenbergBackend, proofData?: ProofData) {
  useEffect(() => {
    if (!proofData || !backend) return;
    const { proof, publicInputs } = proofData;

    toast.promise(backend.verifyFinalProof({ proof, publicInputs }), {
      pending: 'Verifying recursive proof off-chain',
      success: 'Recursive proof verified off-chain',
      error: 'Error verifying recursive proof off-chain',
    });

    // return () => {
    //   backend.destroy();
    // };
  }, [proofData]);
}
