import { UltraHonkBackend } from "@aztec/bb.js";
import fs from "fs";
import circuit from "../circuits/target/parameterized_dot_product.json";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";

(async () => {
  try {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    const inputs = {
      x: [1, 2, 3, 4],
      y: [5, 6, 7, 8],
      expect: 70,
    };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, {
      keccak: true,
    });

    // save proof to file
    fs.writeFileSync("../circuits/target/proof", proof);

    // not really needed as we harcode the public input in the contract test
    fs.writeFileSync(
      "../circuits/target/public-inputs",
      JSON.stringify(publicInputs),
    );

    console.log("Proof generated successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
