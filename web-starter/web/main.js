import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../circuits/target/noir_uh_starter.json";
import { Noir } from "@noir-lang/noir_js";


function log(message) {
    console.log(message);
    const resultDiv = document.getElementById('result');
    resultDiv.textContent += message + '\n\n';
}

async function generateProof() {
    try {
        log('Generating proof...');

        const noir = new Noir(circuit);
        const honk = new UltraHonkBackend(circuit.bytecode, { threads: 8 });

        const inputs = { x: 3, y: 3 }
        const { witness } = await noir.execute(inputs);
        const { proof, publicInputs } = await honk.generateProof(witness);

        log("Proof: " + proof);
        log("Public inputs: " + publicInputs);

        const verified = await honk.verifyProof({ proof, publicInputs });
        log("Verified: " + verified);

    } catch (error) {
        log("Error: " + error);
    }
}

// Add click event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateProofBtn');
    button.addEventListener('click', generateProof);
});
