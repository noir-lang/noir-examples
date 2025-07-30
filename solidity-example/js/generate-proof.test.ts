import { test, describe, before, after } from "node:test";
import { strict as assert } from "node:assert";
import fs from "fs";
import path from "path";
import { spawn, ChildProcess } from "child_process";
import { UltraHonkBackend } from "@aztec/bb.js";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";
import { createTestClient, http, createWalletClient, parseEther, formatEther } from "viem";
import { foundry } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import circuit from "../circuits/target/noir_solidity.json";

// Contract ABIs
const VERIFIER_ABI = [
  {
    "inputs": [
      { "internalType": "bytes", "name": "_proof", "type": "bytes" },
      { "internalType": "bytes32[]", "name": "_publicInputs", "type": "bytes32[]" }
    ],
    "name": "verify",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const STARTER_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "_verifier", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getVerifiedCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes", "name": "proof", "type": "bytes" },
      { "internalType": "bytes32[]", "name": "y", "type": "bytes32[]" }
    ],
    "name": "verifyEqual",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifiedCount", 
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Global test state
let anvilProcess: ChildProcess | null = null;
let testClient: any;
let walletClient: any;
let account: any;
let verifierAddress: `0x${string}` | null = null;
let starterAddress: `0x${string}` | null = null;

// Test account (Anvil's default first account)
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

describe("Noir Solidity Example with Ethereum Integration", () => {
  
  before(async () => {
    console.log("Starting Anvil...");
    
    // Start Anvil
    anvilProcess = spawn('anvil', ['--port', '8545', '--host', '0.0.0.0'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    // Wait for Anvil to start
    await new Promise((resolve) => {
      anvilProcess!.stdout!.on('data', (data) => {
        if (data.toString().includes('Listening on')) {
          resolve(void 0);
        }
      });
    });
    
    // Setup viem clients
    account = privateKeyToAccount(PRIVATE_KEY);
    
    testClient = createTestClient({
      chain: foundry,
      mode: 'anvil',
      transport: http('http://127.0.0.1:8545')
    });
    
    walletClient = createWalletClient({
      account,
      chain: foundry,
      transport: http('http://127.0.0.1:8545')
    });
    
    console.log("Anvil started successfully");
  });
  
  after(async () => {
    if (anvilProcess) {
      console.log("Stopping Anvil...");
      anvilProcess.kill();
      anvilProcess = null;
    }
  });
  test("should deploy contracts", async () => {
    console.log("Deploying Verifier contract...");
    
    // Read the compiled bytecode
    const verifierBytecode = fs.readFileSync('../contract/out/Verifier.sol/HonkVerifier.json', 'utf-8');
    const verifierArtifact = JSON.parse(verifierBytecode);
    
    // Deploy Verifier
    const verifierHash = await walletClient.deployContract({
      abi: VERIFIER_ABI,
      bytecode: verifierArtifact.bytecode.object as `0x${string}`,
      args: [],
    });
    
    const verifierReceipt = await testClient.waitForTransactionReceipt({ hash: verifierHash });
    verifierAddress = verifierReceipt.contractAddress!;
    console.log(`Verifier deployed at: ${verifierAddress}`);
    
    console.log("Deploying Starter contract...");
    
    // Read the compiled bytecode for Starter
    const starterBytecode = fs.readFileSync('../contract/out/Starter.sol/Starter.json', 'utf-8');
    const starterArtifact = JSON.parse(starterBytecode);
    
    // Deploy Starter with Verifier address
    const starterHash = await walletClient.deployContract({
      abi: STARTER_ABI,
      bytecode: starterArtifact.bytecode.object as `0x${string}`,
      args: [verifierAddress],
    });
    
    const starterReceipt = await testClient.waitForTransactionReceipt({ hash: starterHash });
    starterAddress = starterReceipt.contractAddress!;
    console.log(`Starter deployed at: ${starterAddress}`);
    
    // Verify deployment
    assert.ok(verifierAddress, "Verifier should be deployed");
    assert.ok(starterAddress, "Starter should be deployed");
  });
  
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

  test("should submit proof transaction to blockchain and verify", async () => {
    assert.ok(starterAddress, "Starter contract must be deployed first");
    
    console.log("Generating proof...");
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    // Use valid inputs: x=3, y=3 -> 3*2+3=9 ✓
    const inputs = { x: 3, y: 3 };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });
    
    console.log("Proof generated successfully");
    console.log(`Public inputs: ${publicInputs}`);
    
    // Check initial verified count
    const initialCount = await testClient.readContract({
      address: starterAddress,
      abi: STARTER_ABI,
      functionName: 'getVerifiedCount',
    });
    console.log(`Initial verified count: ${initialCount}`);
    
    // Format public inputs as bytes32 array
    const formattedPublicInputs = publicInputs.map((input: string) => {
      // Convert to hex string and pad to 32 bytes
      const hex = BigInt(input).toString(16).padStart(64, '0');
      return `0x${hex}` as `0x${string}`;
    });
    
    console.log("Submitting proof verification transaction...");
    
    // Submit verification transaction
    const hash = await walletClient.writeContract({
      address: starterAddress,
      abi: STARTER_ABI,
      functionName: 'verifyEqual',
      args: [`0x${Buffer.from(proof).toString('hex')}` as `0x${string}`, formattedPublicInputs],
    });
    
    console.log(`Transaction hash: ${hash}`);
    
    // Wait for transaction confirmation
    const receipt = await testClient.waitForTransactionReceipt({ hash });
    console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
    
    // Verify transaction was successful
    assert.equal(receipt.status, 'success', "Transaction should be successful");
    
    // Check that verified count increased
    const finalCount = await testClient.readContract({
      address: starterAddress,
      abi: STARTER_ABI,
      functionName: 'getVerifiedCount',
    });
    console.log(`Final verified count: ${finalCount}`);
    
    assert.equal(finalCount, initialCount + 1n, "Verified count should increase by 1");
  });
  
  test("should execute circuit with different valid inputs", async () => {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    // Test cases where x*2+y=9
    const testCases = [
      { x: 1, y: 7 }, // 1*2+7=9
      { x: 2, y: 5 }, // 2*2+5=9
      { x: 4, y: 1 }  // 4*2+1=9
    ];

    for (const inputs of testCases) {
      const { witness } = await noir.execute(inputs);
      const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });
      
      assert.ok(proof, `Proof should be generated for inputs x=${inputs.x}, y=${inputs.y}`);
      assert.ok(proof.length > 0, `Proof should not be empty for inputs x=${inputs.x}, y=${inputs.y}`);
      assert.ok(publicInputs, `Public inputs should be generated for inputs x=${inputs.x}, y=${inputs.y}`);
    }
  });

  test("should handle multiple proof verifications on blockchain", async () => {
    assert.ok(starterAddress, "Starter contract must be deployed first");
    
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    // Get initial count
    const initialCount = await testClient.readContract({
      address: starterAddress,
      abi: STARTER_ABI,
      functionName: 'getVerifiedCount',
    });
    
    // Test multiple valid proofs
    const testCases = [
      { x: 1, y: 7 }, // 1*2+7=9
      { x: 2, y: 5 }  // 2*2+5=9
    ];
    
    for (const inputs of testCases) {
      const { witness } = await noir.execute(inputs);
      const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });
      
      // Format public inputs
      const formattedPublicInputs = publicInputs.map((input: string) => {
        const hex = BigInt(input).toString(16).padStart(64, '0');
        return `0x${hex}` as `0x${string}`;
      });
      
      // Submit verification
      const hash = await walletClient.writeContract({
        address: starterAddress,
        abi: STARTER_ABI,
        functionName: 'verifyEqual',
        args: [`0x${Buffer.from(proof).toString('hex')}` as `0x${string}`, formattedPublicInputs],
      });
      
      const receipt = await testClient.waitForTransactionReceipt({ hash });
      assert.equal(receipt.status, 'success', `Transaction should be successful for x=${inputs.x}, y=${inputs.y}`);
    }
    
    // Check final count
    const finalCount = await testClient.readContract({
      address: starterAddress,
      abi: STARTER_ABI,
      functionName: 'getVerifiedCount',
    });
    
    assert.equal(finalCount, initialCount + BigInt(testCases.length), `Verified count should increase by ${testCases.length}`);
  });
  
  test("should save proof and public inputs to files", async () => {
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });

    // Use valid inputs for the circuit: x*2+y=9, so x=1, y=7
    const inputs = { x: 1, y: 7 };
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