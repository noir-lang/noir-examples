import { Noir } from '@noir-lang/noir_js';
import { useMemo } from 'react';
import type { ProofData } from '@aztec/bb.js';
import { useState } from 'react';
import type { CompiledCircuit } from '@noir-lang/noir_js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import circuit from '../noir/target/stealthdrop.json' with { type: 'json' };

export function useProver() {
  const [proof, setProof] = useState<ProofData>();
  const prove = async (inputs: any) => {
    const { UltraHonkBackend } = await import('@aztec/bb.js');

    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 8 });
    const noir = new Noir(circuit as unknown as CompiledCircuit);

    const { witness } = await noir.execute(inputs);
    const proof = await backend.generateProof(witness, { keccak: true });
    proof.proof = proof.proof.slice(4);

    setProof(proof);
  };

  return { prove, proof };
}
