import { Noir } from '@noir-lang/noir_js';
import type { ProofData } from '@aztec/bb.js';
import { useState } from 'react';
import type { CompiledCircuit } from '@noir-lang/noir_js';
import circuit from '../../../../noir/stealthdrop/target/stealthdrop.json' with { type: 'json' };

export function useProver() {
  const [proof, setProof] = useState<ProofData>();
  const [status, setStatus] = useState<'executing' | 'proving' | 'success' | 'error' | 'idle'>(
    'idle',
  );

  const prove = async (inputs: any) => {
    const start = performance.now();
    setStatus('executing');
    const { UltraHonkBackend } = await import('@aztec/bb.js');

    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 8 });
    const noir = new Noir(circuit as unknown as CompiledCircuit);

    const initializationTime = performance.now() - start;
    console.log(`Initialization time: ${initializationTime}ms`);
    const { witness } = await noir.execute(inputs);
    const witnessTime = performance.now() - initializationTime;
    console.log(`Witness generation time: ${witnessTime}ms`);
    setStatus('proving');
    const proof = await backend.generateProof(witness, { keccak: true });
    proof.proof = proof.proof.slice(4);
    const provingTime = performance.now() - witnessTime;
    console.log(`Proving time: ${provingTime}ms`);
    setStatus('success');

    const totalTime = performance.now() - start;
    console.log(`Total time: ${totalTime}ms`);

    setProof(proof);
  };

  return { prove, proof, status, setStatus, setProof };
}
