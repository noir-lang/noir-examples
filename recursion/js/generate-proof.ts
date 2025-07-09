import { Barretenberg, RawBuffer, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "../circuits/inner/target/inner.json" assert { type: "json" };
import recursiveCircuit from "../circuits/recursive/target/recursive.json" assert { type: "json" };
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";

(async () => {
  try {
    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(innerCircuit.bytecode, { threads: 1 }, { recursive: true });

    // Generate proof for inner circuit1
    const inputs1 = { x: 3, y: 3 }
    const { witness: witness1 } = await innerCircuitNoir.execute(inputs1);
    const { proof: innerProofFields1, publicInputs: innerPublicInputs1 } = await innerBackend.generateProofForRecursiveAggregation(witness1);

    // Get verification key for inner circuit1 as fields
    const innerCircuitVerificationKey1 = await innerBackend.getVerificationKey();
    const barretenbergAPI = await Barretenberg.new({ threads: 1 });
    const vkAsFields1 = (await barretenbergAPI.acirVkAsFieldsUltraHonk(new RawBuffer(innerCircuitVerificationKey1))).map(field => field.toString());

    // Generate proof for inner circuit2
    const inputs2 = { x: 2, y: 5 }
    const { witness: witness2 } = await innerCircuitNoir.execute(inputs2);
    const { proof: innerProofFields2, publicInputs: innerPublicInputs2 } = await innerBackend.generateProofForRecursiveAggregation(witness2);

    // Get verification key for inner circuit2 as fields
    const innerCircuitVerificationKey2 = await innerBackend.getVerificationKey();
    const vkAsFields2 = (await barretenbergAPI.acirVkAsFieldsUltraHonk(new RawBuffer(innerCircuitVerificationKey2))).map(field => field.toString());

    // Generate proof of the recursive circuit
    const recursiveCircuitNoir = new Noir(recursiveCircuit as CompiledCircuit);
    const recursiveBackend = new UltraHonkBackend(recursiveCircuit.bytecode, { threads: 1 });

    const recursiveInputs = {
      proof1: innerProofFields1,
      public_inputs1: innerPublicInputs1,
      verification_key1: vkAsFields1,
      proof2: innerProofFields2,
      public_inputs2: innerPublicInputs2,
      verification_key2: vkAsFields2,
    };
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
