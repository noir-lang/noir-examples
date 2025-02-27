import { Noir } from '@noir-lang/noir_js';
import { UltraHonkBackend, ProofDataForRecursion } from '@aztec/bb.js';
import { CompiledCircuit } from '@noir-lang/types';
import { ProgramCompilationArtifacts } from '@noir-lang/noir_wasm';

export type Circuits = {
  main: ProgramCompilationArtifacts['program'];
  recursive: ProgramCompilationArtifacts['program'];
};

export type BackendInstances = {
  main: UltraHonkBackend;
  recursive: UltraHonkBackend;
};

export type Noirs = {
  main: Noir;
  recursive: Noir;
};

export interface ProofArtifacts {
  proofAsFields: string[];
  vkAsFields: string[];
  vkHash: string;
}
