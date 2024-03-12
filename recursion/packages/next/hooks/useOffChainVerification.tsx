'use client';

import { ProofData } from '@noir-lang/types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';

export function useOffChainVerification(
  backend?: BarretenbergBackend,
  proofData?: ProofData,
  stopLoading?: () => void,
) {
  useEffect(() => {
    if (!proofData || !backend) return;
    const { proof, publicInputs } = proofData;

    const verificationPromise = backend.verifyProof({ proof, publicInputs });
    toast.promise(verificationPromise, {
      pending: 'Verifying recursive proof off-chain',
      success: 'Recursive proof verified off-chain',
      error: 'Error verifying recursive proof off-chain',
    });

    verificationPromise.then(() => {
      stopLoading?.();
    });

    // return () => {
    //   backend.destroy();
    // };
  }, [proofData]);
}
