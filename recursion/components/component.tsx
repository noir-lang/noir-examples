import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir } from '../utils/noir';
import mainCircuit from '../circuits/main/target/main.json';
import recursiveCircuit from '../circuits/recursion/target/recursion.json';

import { ethers } from 'ethers';

function Component() {
  const [input, setInput] = useState({ x: '', y: '' });

  const [mainNoir, setMainNoir] = useState(new Noir(mainCircuit));
  const [recursiveNoir, setRecursiveNoir] = useState(new Noir(recursiveCircuit));

  const [recursiveProof, setRecursiveProof] = useState({} as any);

  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const calculateProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      console.log('generating witnesses for inner proof');
      // Generates the intermediate witness values from the initial witness values
      // that are fed in via the text box.
      const xValue = ethers.utils.hexZeroPad(ethers.utils.hexlify(BigInt(input.x)), 32);
      const yValue = ethers.utils.hexZeroPad(ethers.utils.hexlify(BigInt(input.y)), 32);

      const witness = await mainNoir.generateWitness([xValue, yValue]);
      console.log('witnesses generated: ', witness);

      // There is one public input to the circuit, this is the `y` variable.
      const numPublicInputs = 1;

      // Generate the proof based off of the intermediate witness values.
      console.log('generating inner proof');
      const innerProof = await mainNoir.generateInnerProof(witness);
      console.log('inner proof generated: ', innerProof);

      // Verify the same proof, not inside of a circuit
      console.log('verifying inner proof (out of circuit)');
      const verified = await mainNoir.verifyInnerProof(innerProof);
      console.log('inner proof verified as', verified);

      // Now we will take that inner proof and verify it in an outer proof.
      console.log('Preparing input for outer proof');
      const { proofAsFields, vkAsFields, vkHash } = await mainNoir.generateInnerProofArtifacts(
        innerProof,
        numPublicInputs,
      );

      console.log('Proof as Fields', proofAsFields);
      console.log('Vk as Fields', vkAsFields);
      console.log('Vk Hash', vkHash);
      const aggregationObject = Array(16).fill(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      );
      const recInput = [
        ...vkAsFields.map(e => e.toString()),
        ...proofAsFields,
        yValue,
        vkHash.toString(),
        ...aggregationObject,
      ];

      console.log('generate witnesses for outer circuit');
      const outerWitnesses = await recursiveNoir.generateWitness(recInput);
      console.log('witnesses generated for outer circuit', outerWitnesses);

      console.log('generating outer proof');
      const proof = await recursiveNoir.generateOuterProof(outerWitnesses);
      console.log('Outer proof generated: ', proof);
      setRecursiveProof(proof);
      resolve(proof);
    });

    toast.promise(proofGeneration, {
      pending: 'Generating proof',
      success: 'Proof generated',
      error: 'Error generating proof',
    });
  };

  const verifyProof = async () => {
    if (recursiveProof) {
      const proofVerification = new Promise(async (resolve, reject) => {
        const verification = await recursiveNoir.verifyOuterProof(recursiveProof);
        console.log('Proof verified as', verification);
        resolve(verification);
      });

      toast.promise(proofVerification, {
        pending: 'Verifying proof',
        success: 'Proof verified',
        error: 'Error verifying proof',
      });
    }
  };

  // Verifier the proof if there's one in state
  useEffect(() => {
    if (recursiveProof.length > 0) {
      verifyProof();

      return () => {
        console.log('unmounting');
        mainNoir.destroy();
        recursiveNoir.destroy();
      };
    }
  }, [recursiveProof]);

  const initNoir = async () => {
    setMainNoir(mainNoir);
    setRecursiveNoir(recursiveNoir);

    const initFunctions = Promise.all([mainNoir.init(), recursiveNoir.init()]);
    toast.promise(initFunctions, {
      pending: 'Initializing circuits',
      success: 'Circuits initialized',
      error: 'Error initializing circuits',
    });
  };

  useEffect(() => {
    initNoir();
  }, []);

  return (
    <div className="gameContainer">
      <h1>Example starter</h1>
      <h2>This circuit checks that x and y are different</h2>
      <p>Try it!</p>
      <input name="x" type={'text'} onChange={handleChange} value={input.x} />
      <input name="y" type={'text'} onChange={handleChange} value={input.y} />
      <button onClick={calculateProof}>Calculate proof</button>
    </div>
  );
}

export default Component;
