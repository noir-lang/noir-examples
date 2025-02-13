import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit, InputMap } from '@noir-lang/types';
import { UltraPlonkBackend, UltraHonkBackend } from '@aztec/bb.js';
import { parse } from 'toml';
import initNoirC from '@noir-lang/noirc_abi';
import initACVM from '@noir-lang/acvm_js';

export async function benchPlume(circuitPath: string, inputsPath: string) {
  const [circuit, inputs] = await Promise.all([
    getCompiledCircuit(circuitPath),
    getInputMap(inputsPath),
  ]);

  await benchCircuit(circuit, inputs);
}

// Get from json file returned by nargo compile command.
export async function getCompiledCircuit(path: string): Promise<CompiledCircuit> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch compiled circuit: ${response.statusText}`);
  }
  return await response.json();
}

// Get from Prover.toml file.
export async function getInputMap(path: string): Promise<InputMap> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch input map: ${response.statusText}`);
  }

  const tomlText = await response.text();
  const parsedData = parse(tomlText) as Record<string, string[]>;

  return parsedData;
}

export async function benchCircuit(circuit: CompiledCircuit, inputs: InputMap) {
  console.time('Execution Time');
  const { witness } = await new Noir(circuit).execute(inputs);
  console.timeEnd('Execution Time');

  await Promise.all([
    // benchUltraPlonk(circuit, witness), // fails somewhy
    benchUltraHonk(circuit, witness),
  ]);
}

export async function benchUltraPlonk(circuit: CompiledCircuit, witness: Uint8Array) {
  const backend = new UltraPlonkBackend(circuit.bytecode);

  console.time('UltraPlonk Proof Generation Time');
  const proof = await backend.generateProof(witness);
  console.timeEnd('UltraPlonk Proof Generation Time');

  console.time('UltraPlonk Verification Time');
  const result = await backend.verifyProof(proof);
  console.timeEnd('UltraPlonk Verification Time');

  console.log('UltraPlonk Verification result:', result);
}

export async function benchUltraHonk(circuit: CompiledCircuit, witness: Uint8Array) {
  const backend = new UltraHonkBackend(circuit.bytecode);

  console.time('UltraHonk Proof Generation Time');
  const proof = await backend.generateProof(witness);
  console.timeEnd('UltraHonk Proof Generation Time');

  console.time('UltraHonk Verification Time');
  const result = await backend.verifyProof(proof);
  console.timeEnd('UltraHonk Verification Time');

  console.log('UltraHonk Verification result:', result);
}

(async () => {
  try {
    console.log('Initializing ACVM and NoirC...');
    await Promise.all([
      initACVM(new URL('@noir-lang/acvm_js/web/acvm_js_bg.wasm', import.meta.url).toString()),
      initNoirC(
        new URL('@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm', import.meta.url).toString(),
      ),
    ]);

    console.log('Starting Benchmarks for V1');
    await benchPlume('/artifacts/use_v1.json', '/artifacts/use_v1_prover.toml');

    console.log('Starting Benchmarks for V2');
    await benchPlume('/artifacts/use_v2.json', '/artifacts/use_v2_prover.toml');
  } catch (error) {
    console.error('Error running benchmarks:', error);
  }
})();
