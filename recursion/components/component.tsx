import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir, acvm, generateWitness, abi } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Circuits, Noirs, ProofArtifacts } from '../types';
import { useAccount, useConnect, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import deployment from "../utils/addresses.json"
import { bytesToHex, hexToBytes, pad, toHex } from 'viem'
import { InputMap } from '@noir-lang/noirc_abi';
import axios from "axios";

import { initializeResolver } from '@noir-lang/source-resolver';
import newCompiler, { compile, init_log_level as compilerLogLevel } from '@noir-lang/noir_wasm';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import { Proof } from 'viem/_types/types/proof';

function splitProof(aggregatedProof: Uint8Array) {
    const splitIndex = aggregatedProof.length - 2144;

    const publicInputsConcatenated = aggregatedProof.slice(0, splitIndex);

    const publicInputSize = 32;
    const publicInputs: Uint8Array[] = [];

    for (let i = 0; i < publicInputsConcatenated.length; i += publicInputSize) {
      const publicInput = publicInputsConcatenated.slice(i, i + publicInputSize);
      publicInputs.push(publicInput);
    }

    const proof = aggregatedProof.slice(splitIndex);
    return { proof, publicInputs };
}

async function getCircuit(name: string) {
  await newCompiler();

  const {data: noirSource} = await axios.get("/api/readCircuitFile?filename=" + name)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeResolver((id: string) => {
    const source = noirSource
    return source;
  });

  try {
    // We're ignoring this in the resolver but pass in something sensible.
    const compiled = compile("main");
    console.log(compiled)
    return compiled
  } catch(er) {
    console.log(er)
  }
}

function Component() {
  const [circuits, setCircuits] = useState<Circuits>()
  const [backends, setBackends] = useState<BackendInstances>()
  const [noirs, setNoirs] = useState<Noirs>()

  const [input, setInput] = useState<{[key: string]: string}>({"x": "1", "y": "2"});

  const [mainProofArtifacts, setMainProofArtifacts] = useState<ProofArtifacts>()
  const [recursiveProofArtifacts, setRecursiveProofArtifacts] = useState<ProofArtifacts>();

  const { address, connector, isConnected } = useAccount()
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  const contractCallConfig = {
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F" as`0x${string}`,
    abi: [...deployment.abi]
  }

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...contractCallConfig,
    functionName: "verify",
  })

    const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })


  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
  };

  const calculateMainProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      console.log("backend here:", backends!.main)

      console.log('generating inner proof');
      console.log(input as InputMap)
      const inputs = {
        x: "2",
        y: "3"
      }
      const { witness, returnValue} = await noirs!.main.execute(inputs);
      const { publicInputs, proof } = await backends!.main.generateIntermediateProof(witness);

      console.log('inner proof generated: ', {proof: bytesToHex(proof), publicInputs});

      // Verify the same proof, not inside of a circuit
      console.log('verifying inner proof (out of circuit)');
      const verified = await backends!.main.verifyIntermediateProof({proof, publicInputs});

      console.log('inner proof verified as', verified);

      // Now we will take that inner proof and verify it in an outer proof.
      console.log('Preparing input for outer proof');
      const { proofAsFields, vkAsFields, vkHash } = await backends!.main.generateIntermediateProofArtifacts(
        {publicInputs, proof},
        1, // 1 public input
      );

      setMainProofArtifacts({ returnValue, proof, publicInputs, proofAsFields, vkAsFields, vkHash })

      resolve(true)
    });

    toast.promise(proofGeneration, {
      pending: 'Generating proof',
      success: 'Proof generated',
      error: 'Error generating proof',
    });

  };

  const calculateRecursiveProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      console.log(mainProofArtifacts)

      const aggregationObject : string[] = Array(16).fill(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      );
      const recInput = {
        verification_key: mainProofArtifacts!.vkAsFields.map(e => e.toString()),
        proof: mainProofArtifacts!.proofAsFields,
        public_inputs: ["0x" + input!["y"]],
        key_hash: mainProofArtifacts!.vkHash,
        input_aggregation_object: aggregationObject,
      }

      console.log("recursive: inputs for backend verify", recInput)
      // console.log('generating outer proof');
      const { witness, returnValue } = await noirs!.recursive.execute(recInput);

      // const witnessMap = await abi.abiEncode(recursiveCircuit.abi, recInput, null);

      // const retWitness = await acvm.getReturnWitness(base64Decode(recursiveCircuit.bytecode), witnessMap);

      console.log("witness", witness)
      console.log("return", returnValue)

      const { publicInputs, proof } = await backends!.recursive.generateFinalProof(witness);

      // console.log('Outer proof generated: ', aggregatedProof);
      // console.log("string", bytesToHex(aggregatedProof))
      // console.log('Outer proof size: ', aggregatedProof.length);
      // const publicInputs = piArray.map((input: Uint8Array) => bytesToHex(input))

      console.log("recursive proof:", proof, publicInputs)
      setRecursiveProofArtifacts({ returnValue, proof, publicInputs, proofAsFields: [], vkAsFields: [], vkHash: "" })

      resolve(proof);
    });

    toast.promise(proofGeneration, {
      pending: 'Generating recursive proof',
      success: 'Recursive proof generated',
      error: 'Error generating recursive proof',
    });
  }

  const verifyProof = async () => {
    if (recursiveProofArtifacts) {
      const proofVerification = new Promise(async (resolve, reject) => {
        console.log("verifying final proof")
        console.log("backend here:", backends!.recursive)

        const { proof, publicInputs } = recursiveProofArtifacts;
        const verification = await backends!.recursive.verifyFinalProof({ proof, publicInputs });

        console.log('Proof verified as', verification);
        await noirs!.recursive.destroy();

        resolve(verification);
      });

      toast.promise(proofVerification, {
        pending: 'Verifying recursive proof',
        success: 'Recursive proof verified',
        error: 'Error verifying recursive proof',
      });

      const { proof, publicInputs } = recursiveProofArtifacts;
      console.log(bytesToHex(proof), publicInputs.map((pi : Uint8Array) => bytesToHex(pi)))
      write?.({
        args: [bytesToHex(proof), publicInputs.map((pi : Uint8Array) => bytesToHex(pi))]
      })
    }
  };

    // Verifier the proof if there's one in state
  useEffect(() => {
    if (mainProofArtifacts) {
      calculateRecursiveProof();
    }
  }, [mainProofArtifacts]);

  // Verifier the proof if there's one in state
  useEffect(() => {
    if (recursiveProofArtifacts) {
      verifyProof();
    }
  }, [recursiveProofArtifacts]);

  const init = async () => {
    const circuits = {
      main: await getCircuit("main"),
      recursive: await getCircuit("recursion")
    }
    setCircuits(circuits)

    const backends = {
      main: new BarretenbergBackend(circuits.main, { threads: 8 }),
      recursive: new BarretenbergBackend(circuits.recursive, { threads: 8 })
    }

    setBackends(backends)

    const noirs = {
      main: new Noir(circuits.main, backends.main),
      recursive: new Noir(circuits.recursive, backends.recursive)
    };
    await noirs.main.init()
    await noirs.recursive.init()

    setNoirs(noirs)
  }

  useEffect(() => {
      if (!backends || !circuits || !noirs) {
        init()
      }
  }, [])

  return (
    <div className="gameContainer">
      <h1>Recursive!</h1>
      <p>This circuit proves that x and y are different (main proof)</p>
      <p>Then it feeds that proof into another circuit, which then proves it verifies (recursive proof)</p>
      <h2>Try it!</h2>
      <input name="x" type={'text'} onChange={handleChange} value={input?.x} />
      <input name="y" type={'text'} onChange={handleChange} value={input?.y} />
      {circuits && backends && noirs && <button onClick={calculateMainProof}>Calculate proof</button>}
    </div>
  );
}

export default Component;
