import { useState, useEffect, ChangeEvent } from 'react';

import { toast } from 'react-toastify';
import React from 'react';
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend, flattenPublicInputs } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Circuits, Noirs, ProofArtifacts } from '../types.js';
import { useAccount, useConnect, useContractRead } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import abi from "../utils/verifierAbi.json"
import axios from "axios";

// @ts-ignore
import { initializeResolver } from '@noir-lang/source-resolver';
import init, { compile } from '@noir-lang/noir_wasm';
import { bytesToHex } from 'viem';
import addresses from '../utils/addresses.json';



async function getCircuit(name: string) {
  await init();
  const {data: noirSource} = await axios.get("/api/readCircuitFile?filename=" + name)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeResolver((id: string) => {
    const source = noirSource
    return source;
  });

  const compiled = compile("main");
  return compiled
}

function Component() {
  const [circuits, setCircuits] = useState<Circuits>()
  const [backends, setBackends] = useState<BackendInstances>()
  const [noirs, setNoirs] = useState<Noirs>()

  const [input, setInput] = useState<{[key: string]: string}>({"x": "1", "y": "2"});

  const [mainProofArtifacts, setMainProofArtifacts] = useState<ProofArtifacts>()
  const [recursiveProofArtifacts, setRecursiveProofArtifacts] = useState<ProofArtifacts>();
  const [recursiveVerifyParams, setRecursiveVerifyParams] = useState<{ proof: `0x${string}`, publicInputs: `0x${string}`[]}>();

  const { address, connector, isConnected } = useAccount()
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  const contractCallConfig = {
    address: addresses.verifier as`0x${string}`,
    abi
  }

  const {  data, error, isLoading, isError } = useContractRead({
    ...contractCallConfig,
    functionName: "verify",
    args: [recursiveVerifyParams?.proof, recursiveVerifyParams?.publicInputs],
    enabled: recursiveVerifyParams !== undefined
  })

  useEffect(() => {
    if (isLoading || isError || data ) {
      let txToast = toast("Verifying on-chain", { toastId: "verify" })

      if (data) {
        toast.update(txToast, {type: toast.TYPE.SUCCESS, render: "Proof verified on-chain!"})
      }
      
      if (error) {
        toast.update(txToast, {type: toast.TYPE.ERROR, render: "Error verifying proof on-chain"})
      }
    }
  }, [data, isLoading, isError, error])


  // Handles input state
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
  };

  const calculateMainProof = async () => {
    const proofGeneration = new Promise(async (resolve, reject) => {
      const inputs = {
        x: "2",
        y: "3"
      }
      const { witness, returnValue } = await noirs!.main.execute(inputs);
      const { publicInputs, proof } = await backends!.main.generateIntermediateProof(witness);

      // Now we will take that inner proof and verify it in an outer proof.
      const { proofAsFields, vkAsFields, vkHash } = await backends!.main.generateIntermediateProofArtifacts(
        {publicInputs, proof},
        1, // 1 public input
      );

      console.log([proof, publicInputs, proofAsFields, vkAsFields, vkHash])
      setMainProofArtifacts({ returnValue: returnValue as unknown as Uint8Array, proof, publicInputs, proofAsFields, vkAsFields, vkHash })

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
      const { witness, returnValue } = await noirs!.recursive.execute(recInput);
      const { publicInputs, proof } = await backends!.recursive.generateFinalProof(witness);
      console.log([proof, publicInputs])

      setRecursiveProofArtifacts({ returnValue: returnValue as unknown as Uint8Array, proof, publicInputs, proofAsFields: [], vkAsFields: [], vkHash: "" })
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
      const { proof, publicInputs } = recursiveProofArtifacts;

      await toast.promise(backends!.recursive.verifyFinalProof({ proof, publicInputs }), {
        pending: 'Verifying recursive proof',
        success: 'Recursive proof verified',
        error: 'Error verifying recursive proof',
      });

      console.log([proof, flattenPublicInputs(publicInputs)])

      setRecursiveVerifyParams({proof: bytesToHex(proof), publicInputs: flattenPublicInputs(publicInputs) as `0x${string}`[]})
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
      main: (await getCircuit("main")).program,
      recursive: (await getCircuit("recursion")).program
    }
    setCircuits(circuits)

    const backends = {
      main: new BarretenbergBackend(circuits.main, { threads: navigator.hardwareConcurrency }),
      recursive: new BarretenbergBackend(circuits.recursive, { threads: navigator.hardwareConcurrency })
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
