import { Barretenberg, RawBuffer, UltraHonkBackend } from "@aztec/bb.js";
import innerCircuit from "../circuits/inner/target/inner.json" with { type: "json" };
import recursiveCircuit from "../circuits/recursive/target/recursive.json" with { type: "json" };
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";
import path from "path";
import fs from "fs";

// ✅ Fix __dirname for ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// ✅ Define test_inputs directory path
const testInputsDir = path.join(__dirname, "../circuits/recursive/test_inputs");

// ✅ Remove stale or misnamed test inputs
[
  "test_valid_recursive_proof.json",
  "test_invalid_recursive_proof.json"
].forEach((file) => {
  const filePath = path.join(testInputsDir, file);
  if (fs.existsSync(filePath)) fs.rmSync(filePath);
});

(async () => {
  try {
    // === Step 1: Generate inner proof ===
    const innerCircuitNoir = new Noir(innerCircuit as CompiledCircuit);
    const innerBackend = new UltraHonkBackend(innerCircuit.bytecode, { threads: 1 }, { recursive: true });

    const inputs = { x: 3, y: 3 };
    const { witness } = await innerCircuitNoir.execute(inputs);
    // Generate proof (only grab `proof`)
    const { proof: innerProofFields } = await innerBackend.generateProofForRecursiveAggregation(witness);
    // ✅ Get the actual public inputs for verifier (matches `pub` values in Noir)
    const innerPublicInputs = await innerBackend.getPublicInputsForVerifier(witness);


    const innerCircuitVerificationKey = await innerBackend.getVerificationKey();
    const barretenbergAPI = await Barretenberg.new({ threads: 1 });

    const vkAsFields = (
      await barretenbergAPI.acirVkAsFieldsUltraHonk(new RawBuffer(innerCircuitVerificationKey))
    ).map((field) => field.toString());

    // === Step 2: Generate recursive proof ===
    const recursiveCircuitNoir = new Noir(recursiveCircuit as CompiledCircuit);
    const recursiveBackend = new UltraHonkBackend(recursiveCircuit.bytecode, { threads: 1 });

    const recursiveInputs = {
      proof: innerProofFields,
      public_inputs: innerPublicInputs,
      verification_key: vkAsFields,
    };

    const { witness: recursiveWitness } = await recursiveCircuitNoir.execute(recursiveInputs);
    const { proof: recursiveProof, publicInputs: recursivePublicInputs } =
      await recursiveBackend.generateProof(recursiveWitness);

    // === Step 3: Verify recursive proof ===
    const verified = await recursiveBackend.verifyProof({
      proof: recursiveProof,
      publicInputs: recursivePublicInputs,
    });
    console.log("Recursive proof verified: ", verified);

    // === Step 4: Save test input JSON for Noir unit tests ===
    fs.mkdirSync(testInputsDir, { recursive: true });

    const data = {
      verification_key: vkAsFields,
      proof: recursiveProof,
      public_inputs: recursivePublicInputs,
    };

    // Use Noir test function naming!
    fs.writeFileSync(
      path.join(testInputsDir, "test_valid_recursive_proof.json"),
      JSON.stringify(data, null, 2)
    );

    // Make invalid proof JSON
    const validPath = path.join(testInputsDir, "test_valid_recursive_proof.json");
    const valid = JSON.parse(fs.readFileSync(validPath, "utf-8"));
    const invalid = { ...valid, public_inputs: [...valid.public_inputs] };
    invalid.public_inputs[0] = (BigInt(invalid.public_inputs[0]) + 1n).toString();
    const invalidPath = path.join(testInputsDir, "test_invalid_recursive_proof.json");
    fs.writeFileSync(invalidPath, JSON.stringify(invalid, null, 2));

    process.exit(verified ? 0 : 1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();