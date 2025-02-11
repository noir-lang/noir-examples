import { Noir } from '@noir-lang/noir_js';
import { useMemo } from 'react';
import type { ProofData } from '@aztec/bb.js';
import { useState } from 'react';
import type { CompiledCircuit } from '@noir-lang/noir_js';
import circuit from '../noir/target/stealthdrop.json' with { type: 'json' };

export function useProver() {
  const [proof, setProof] = useState<ProofData>();
  const [status, setStatus] = useState<'executing' | 'proving' | 'success' | 'error' | 'idle'>(
    'idle',
  );

  const prove = async (inputs: any) => {
    const { UltraHonkBackend } = await import('@aztec/bb.js');

    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 8 });
    const noir = new Noir(circuit as unknown as CompiledCircuit);

    setStatus('executing');
    const { witness } = await noir.execute(inputs);
    setStatus('proving');
    const proof = await backend.generateProof(witness, { keccak: true });
    proof.proof = proof.proof.slice(4);
    setStatus('success');

    setProof(proof);
  };

  return { prove, proof, status, setStatus, setProof };
}
