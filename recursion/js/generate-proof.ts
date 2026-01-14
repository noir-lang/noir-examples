import { Barretenberg, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "../circuits/inner/target/inner.json" with { type: "json" };
import recursiveCircuit from "../circuits/recursive/target/recursive.json" with { type: "json" };
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";

// Helper function to convert proof bytes to field elements
function proofToFields(proof: Uint8Array): string[] {
  const fields: string[] = [];
  for (let i = 0; i < proof.length; i += 32) {
    const chunk = proof.slice(i, i + 32);
    fields.push('0x' + Buffer.from(chunk).toString('hex'));
  }
  return fields;
}

(async () => {
  try {
    // Initialize Barretenberg backend
    const api = await Barretenberg.new({ threads: 8 });

    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(innerCircuit.bytecode, api);

    // Generate proof for inner circuit with recursive verification target
    const inputs = { x: 3, y: 3 }
    const { witness } = await innerCircuitNoir.execute(inputs);
    const { proof, publicInputs: innerPublicInputs } = await innerBackend.generateProof(witness, { verifierTarget: 'noir-recursive-no-zk' });

    // Get verification key as fields and vk hash using generateRecursiveProofArtifacts
    const artifacts = await innerBackend.generateRecursiveProofArtifacts(proof, innerPublicInputs.length, { verifierTarget: 'noir-recursive-no-zk' });
    const vkAsFields = artifacts.vkAsFields;
    const vkHash = artifacts.vkHash;

    // Convert proof to fields manually since proofAsFields is not implemented
    const proofAsFields = proofToFields(proof);

    // Generate proof of the recursive circuit
    const recursiveCircuitNoir = new Noir(recursiveCircuit as CompiledCircuit);
    const recursiveBackend = new UltraHonkBackend(recursiveCircuit.bytecode, api);

    const recursiveInputs = { verification_key: vkAsFields, proof: proofAsFields, public_inputs: innerPublicInputs, key_hash: vkHash };
    const { witness: recursiveWitness } = await recursiveCircuitNoir.execute(recursiveInputs);
    const { proof: recursiveProof, publicInputs: recursivePublicInputs } = await recursiveBackend.generateProof(recursiveWitness, { verifierTarget: 'evm' });

    // Verify recursive proof
    const verified = await recursiveBackend.verifyProof({ proof: recursiveProof, publicInputs: recursivePublicInputs }, { verifierTarget: 'evm' });
    console.log("Recursive proof verified: ", verified);

    process.exit(verified ? 0 : 1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
