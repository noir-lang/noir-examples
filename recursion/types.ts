
import { Noir, abi } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { CompiledCircuit, ProofData } from "@noir-lang/types"


export type Circuits = {
  main: CompiledCircuit,
  recursive: CompiledCircuit
}

export type BackendInstances = {
  main: BarretenbergBackend,
  recursive: BarretenbergBackend
}

export type Noirs = {
  main: Noir,
  recursive: Noir
}

export interface ProofArtifacts extends ProofData {
  returnValue: abi.InputValue,
  proofAsFields: string[],
  vkAsFields: string[],
  vkHash: string
}

