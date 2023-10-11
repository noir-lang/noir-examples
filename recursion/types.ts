
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';

export type BackendInstances = {
  main: BarretenbergBackend,
  recursive: BarretenbergBackend
}

export type ProofArtifacts = {
  proofAsFields: string[],
  vkAsFields: string[],
  vkHash: string
}
