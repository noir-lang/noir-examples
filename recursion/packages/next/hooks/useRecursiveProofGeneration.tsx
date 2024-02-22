'use client';

import { toast } from 'react-toastify';
import { ProofArtifacts } from '../../hardhat/types';
import { useEffect, useState } from 'react';
import { getCircuit } from '../utils/compile';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir, ProofData } from '@noir-lang/noir_js';

export function useRecursiveProofGeneration(
  artifacts?: ProofArtifacts,
  inputs?: { [key: string]: string },
) {
  const [proofData, setProofData] = useState<ProofData | undefined>();
  const [recursiveNoir, setRecursiveNoir] = useState<Noir | undefined>();

  const proofGeneration = async () => {
    if (!artifacts || !inputs) return;

    const circuit = await getCircuit('recursion');
    const backend = new BarretenbergBackend(circuit, { threads: navigator.hardwareConcurrency });
    const noir = new Noir(circuit, backend);

    const { vkAsFields, proofAsFields, vkHash } = artifacts;
    const recInput = {
      verification_key: vkAsFields.map(e => e.toString()),
      proof: proofAsFields,
      public_inputs: ['0x' + inputs['y']],
      key_hash: vkHash,
    };

    const proofData = await noir.generateProof(recInput);

    setRecursiveNoir(noir);
    setProofData(proofData);
  };

  useEffect(() => {
    if (!artifacts || !inputs) return;
    toast.promise(proofGeneration, {
      pending: 'Generating recursive proof',
      success: 'Recursive proof generated',
      error: 'Error generating recursive proof',
    });
  }, [artifacts, inputs]);

  return { recursiveNoir, proofData };
}
