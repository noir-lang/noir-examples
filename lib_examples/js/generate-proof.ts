import { UltraHonkBackend } from "@aztec/bb.js";
import fs from "fs";
import circuit from "../base64_example/target/base64_example.json";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";


(async () => {
  try {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    const inputs = { 
    base64_encoded: [
  83, 71, 86, 115, 98, 71, 56, 103, 86, 50, 57, 121, 98, 71, 81, 104 ],
  input: [
  72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]
     }
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });

    // save proof to file
    fs.writeFileSync("../base64_example/target/proof", proof);

    // not really needed as we harcode the public input in the contract test
    fs.writeFileSync("../base64_example/target/public-inputs", JSON.stringify(publicInputs));

    console.log("Proof generated successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
