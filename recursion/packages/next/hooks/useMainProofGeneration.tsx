'use client';

import { toast } from 'react-toastify';
import { ProofArtifacts } from '../../hardhat/types';
import { useEffect, useState } from 'react';
import { getCircuit } from '../utils/compile';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

export function useMainProofGeneration(inputs?: { x: string; y: string }) {
  const [mainProofArtifacts, setMainProofArtifacts] = useState<ProofArtifacts>();

  const proofGeneration = async () => {
    if (!inputs) return;

    const circuit = await getCircuit('main');
    const backend = new BarretenbergBackend(circuit, { threads: navigator.hardwareConcurrency });
    const noir = new Noir(circuit, backend);

    const { publicInputs, proof } = await toast.promise(noir.generateProof(inputs), {
      pending: 'Generating proof',
      success: 'Proof generated',
      error: 'Error generating proof',
    });

    toast.promise(noir.verifyProof({ proof, publicInputs }), {
      pending: 'Verifying intermediate proof',
      success: 'Intermediate proof verified',
      error: 'Error verifying intermediate proof',
    });

    const mainProofArtifacts = await backend.generateRecursiveProofArtifacts(
      { publicInputs, proof },
      1, // 1 public input
    );

    setMainProofArtifacts({ proof, publicInputs, ...mainProofArtifacts });
  };

  useEffect(() => {
    proofGeneration();
  }, [inputs]);

  return mainProofArtifacts;
}
