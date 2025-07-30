import { test, describe } from "node:test";
import { strict as assert } from "node:assert";
import fs from "fs";
import path from "path";
import { UltraHonkBackend } from "@aztec/bb.js";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuits/target/noir_solidity.json";

describe("Noir Solidity Example", () => {
  test("should generate proof successfully", async () => {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    const inputs = { x: 3, y: 3 };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });

    // Verify proof is generated
    assert.ok(proof, "Proof should be generated");
    assert.ok(proof.length > 0, "Proof should not be empty");
    
    // Verify public inputs
    assert.ok(publicInputs, "Public inputs should be generated");
    assert.ok(Array.isArray(publicInputs), "Public inputs should be an array");
  });

  test("should execute circuit with different inputs", async () => {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    const testCases = [
      { x: 1, y: 1 },
      { x: 5, y: 5 },
      { x: 10, y: 10 }
    ];

    for (const inputs of testCases) {
      const { witness } = await noir.execute(inputs);
      const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });
      
      assert.ok(proof, `Proof should be generated for inputs x=${inputs.x}, y=${inputs.y}`);
      assert.ok(proof.length > 0, `Proof should not be empty for inputs x=${inputs.x}, y=${inputs.y}`);
      assert.ok(publicInputs, `Public inputs should be generated for inputs x=${inputs.x}, y=${inputs.y}`);
    }
  });

  test("should save proof and public inputs to files", async () => {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    const inputs = { x: 7, y: 7 };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });

    // Test file paths
    const proofPath = "../circuits/target/proof";
    const publicInputsPath = "../circuits/target/public-inputs";

    // Save files
    fs.writeFileSync(proofPath, proof);
    fs.writeFileSync(publicInputsPath, JSON.stringify(publicInputs));

    // Verify files exist and have content
    assert.ok(fs.existsSync(proofPath), "Proof file should exist");
    assert.ok(fs.existsSync(publicInputsPath), "Public inputs file should exist");
    
    const savedProof = fs.readFileSync(proofPath);
    const savedPublicInputs = JSON.parse(fs.readFileSync(publicInputsPath, 'utf-8'));
    
    assert.ok(savedProof.length > 0, "Saved proof should not be empty");
    assert.deepEqual(savedPublicInputs, publicInputs, "Saved public inputs should match generated ones");

    // Clean up test files
    fs.unlinkSync(proofPath);
    fs.unlinkSync(publicInputsPath);
  });
});