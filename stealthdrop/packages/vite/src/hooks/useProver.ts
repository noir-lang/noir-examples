import { Noir } from '@noir-lang/noir_js';
import { useState } from 'react';
import type { CompiledCircuit } from '@noir-lang/noir_js';

export type ProofData = {
  publicInputs: string[];
  proof: Uint8Array;
};

// @ts-ignore
import acvm from '@noir-lang/acvm_js/web/acvm_js_bg.wasm?url';
// @ts-ignore
import noirc from '@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url';
import initNoirC from '@noir-lang/noirc_abi';
import initACVM from '@noir-lang/acvm_js';

export function useProver() {
  const [proof, setProof] = useState<ProofData>();
  const [status, setStatus] = useState<'executing' | 'proving' | 'success' | 'error' | 'idle'>(
    'idle',
  );

  const prove = async (inputs: any) => {
    const start = performance.now();

    setStatus('executing');
    const stealthdropCircuit = await import('../../../noir/target/stealthdrop.json');

    // @ts-ignore
    await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

    const { UltraHonkBackend } = await import('@aztec/bb.js');

    // @ts-ignore
    const backend = new UltraHonkBackend(stealthdropCircuit.bytecode, {
      threads: navigator.hardwareConcurrency,
    });
    const noir = new Noir(stealthdropCircuit as unknown as CompiledCircuit);

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
