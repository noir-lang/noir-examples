import { deflattenFields, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "../circuits/inner/target/inner.json" with { type: "json" };
import recursiveCircuit from "../circuits/recursive/target/recursive.json" with { type: "json" };
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";

(async () => {
  try {
    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(innerCircuit.bytecode, { threads: 1 }, { recursive: true });

    // Generate proof for inner circuit
    const inputs = { x: 3, y: 3 }
    const { witness } = await innerCircuitNoir.execute(inputs);
    const { proof, publicInputs: innerPublicInputs } = await innerBackend.generateProof(witness);

    // Get verification key for inner circuit as fields
    const vk = await innerBackend.getVerificationKey();
    const vkAsFields = deflattenFields(vk);
    const proofAsFields = deflattenFields(proof);

    // Generate the key hash using the backend method
    const artifacts = await innerBackend.generateRecursiveProofArtifacts(proof, innerPublicInputs.length);
    const vkHash = artifacts.vkHash;

    // Generate proof of the recursive circuit
    const recursiveCircuitNoir = new Noir(recursiveCircuit as CompiledCircuit);
    const recursiveBackend = new UltraHonkBackend(recursiveCircuit.bytecode, { threads: 8 });

    const recursiveInputs = { verification_key: vkAsFields, proof: proofAsFields, public_inputs: innerPublicInputs, key_hash: vkHash };
    const { witness: recursiveWitness } = await recursiveCircuitNoir.execute(recursiveInputs);
    const { proof: recursiveProof, publicInputs: recursivePublicInputs } = await recursiveBackend.generateProof(recursiveWitness);

    // Verify recursive proof
    const verified = await recursiveBackend.verifyProof({ proof: recursiveProof, publicInputs: recursivePublicInputs });
    console.log("Recursive proof verified: ", verified);

    process.exit(verified ? 0 : 1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
