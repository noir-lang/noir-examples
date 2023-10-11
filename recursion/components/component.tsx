import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir, generateWitness } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import mainCircuit from '../circuits/main/target/main.json';
import recursiveCircuit from '../circuits/recursion/target/recursion.json';

import { BackendInstances, ProofArtifacts } from '../types';
import { ethers } from 'ethers';



function Component() {
  const [input, setInput] = useState<{[key: string]: number}>({"x": 0, "y": 0});


  const [mainProof, setMainProof] = useState<Uint8Array | null>(null);
  const [recursiveBackend, setRecursiveBackend] = useState<BarretenbergBackend | null>(null)
  const [proofArtifacts, setProofArtifacts] = useState<ProofArtifacts | null>(null)
  const [recursiveProof, setRecursiveProof] = useState<Uint8Array | null>(null);

  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value as number});
  };

  const calculateMainProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      const backends : BackendInstances = {
        main: new BarretenbergBackend(mainCircuit, 8),
        recursive: new BarretenbergBackend(recursiveCircuit, 8)
      }

      setRecursiveBackend(backends.recursive)
        
      // Main
      const main = new Noir(mainCircuit, backends.main);
      await main.init();

      const numPublicInputs = 1;
      console.log('generating inner proof');
      console.log(input)
      const mainWitness = await generateWitness(mainCircuit, input);
      const innerProof = await backends.main.generateIntermediateProof(mainWitness);
      setMainProof(innerProof)
      console.log('inner proof generated: ', innerProof);

      // Verify the same proof, not inside of a circuit
      console.log('verifying inner proof (out of circuit)');
      const verified = await backends.main.verifyIntermediateProof(innerProof);
      console.log('inner proof verified as', verified);

      // Now we will take that inner proof and verify it in an outer proof.
      console.log('Preparing input for outer proof');
      const { proofAsFields, vkAsFields, vkHash } = await backends.main.generateIntermediateProofArtifacts(
        innerProof,
        numPublicInputs,
      );
      setProofArtifacts({ proofAsFields, vkAsFields, vkHash })

      await backends.main.destroy();
      resolve(innerProof)
    });

    toast.promise(proofGeneration, {
      pending: 'Generating proof',
      success: 'Proof generated',
      error: 'Error generating proof',
    });
  };

  const calculateRecursiveProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      // Recursion
      const recursive = new Noir(recursiveCircuit, recursiveBackend!);
      await recursive.init()

      console.log(proofArtifacts)

      const { proofAsFields, vkAsFields, vkHash } = proofArtifacts!
      console.log('Proof as Fields', proofAsFields);
      console.log('Vk as Fields', vkAsFields);
      console.log('Vk Hash', vkHash);
      const aggregationObject = Array(16).fill(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      );
      const recInput = {
        verification_key: vkAsFields.map(e => e.toString()),
        proof: proofAsFields,
        public_inputs: [input!["y"]],
        key_hash: vkHash,
        input_aggregation_object: aggregationObject,
      }

      console.log("rec input", recInput)
      console.log('generating outer proof');
      const recWitness = await generateWitness(recursiveCircuit, recInput);

      const proof = await recursiveBackend!.generateFinalProof(recWitness);
      console.log('Outer proof generated: ', proof);
      setRecursiveProof(proof);

      resolve(proof);
    });

    toast.promise(proofGeneration, {
      pending: 'Generating recursive proof',
      success: 'Recursive proof generated',
      error: 'Error generating recursive proof',
    });
  }

  const verifyProof = async () => {
    if (recursiveProof) {
      const proofVerification = new Promise(async (resolve, reject) => {
        console.log("verifying final proof")
        const verification = await recursiveBackend!.verifyFinalProof(recursiveProof);
        console.log('Proof verified as', verification);
        recursiveBackend!.destroy();

        resolve(verification);
      });

      toast.promise(proofVerification, {
        pending: 'Verifying recursive proof',
        success: 'Recursive proof verified',
        error: 'Error verifying recursive proof',
      });
    }
  };

    // Verifier the proof if there's one in state
  useEffect(() => {
    if (mainProof && proofArtifacts) {
      calculateRecursiveProof();
    }
  }, [mainProof, proofArtifacts]);

  // Verifier the proof if there's one in state
  useEffect(() => {
    if (recursiveProof) {
      verifyProof();
    }
  }, [recursiveProof]);

  return (
    <div className="gameContainer">
      <h1>Recursive!</h1>
      <p>This circuit proves that x and y are different (main proof)</p>
      <p>Then it feeds that proof into another circuit, which then proves it verifies (recursive proof)</p>
      <h2>Try it!</h2>
      <input name="x" type={'text'} onChange={handleChange} value={input?.x} />
      <input name="y" type={'text'} onChange={handleChange} value={input?.y} />
      <button onClick={calculateMainProof}>Calculate proof</button>
    </div>
  );
}

export default Component;
