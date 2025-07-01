"use client";
import { useState } from "react";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../../../circuits/target/noir_uh_starter.json";
import { Noir } from "@noir-lang/noir_js";

export default function ProofComponent() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateProof() {
    setLoading(true);
    setResult((prev) => prev + "Generating proof...\n\n");
    try {
      const noir = new Noir(circuit as any);
      const honk = new UltraHonkBackend((circuit as any).bytecode, {
        threads: 8,
      });
      const inputs = { x: 3, y: 3 };
      const { witness } = await noir.execute(inputs);
      const { proof, publicInputs } = await honk.generateProof(witness);
      setResult((prev) => prev + "Proof: " + proof + "\n\n");
      setResult((prev) => prev + "Public inputs: " + publicInputs + "\n\n");
      const verified = await honk.verifyProof({ proof, publicInputs });
      setResult((prev) => prev + "Verified: " + verified + "\n\n");

      // Send proof to server for server-side verification
      setResult((prev) => prev + "Verifying on server...\n\n");
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proof, publicInputs }),
      });
      const serverResult = await response.json();
      setResult(
        (prev) => prev + "Server verified: " + serverResult.verified + "\n\n"
      );
    } catch (error) {
      setResult((prev) => prev + "Error: " + error + "\n\n");
    }
    setLoading(false);
  }

  return (
    <div>
      <button id="generateProofBtn" onClick={generateProof} disabled={loading}>
        {loading ? "Generating..." : "Generate Proof"}
      </button>
      <div style={{ whiteSpace: "pre-wrap" }} id="result">
        {result}
      </div>
    </div>
  );
}
