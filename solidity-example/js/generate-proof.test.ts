import { test, describe, before, after } from "node:test";
import { strict as assert } from "node:assert";
import fs from "fs";
import { spawn, ChildProcess } from "child_process";
import { Barretenberg, UltraHonkBackend } from "@aztec/bb.js";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";
import { http, createWalletClient, createPublicClient } from "viem";
import { foundry } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import circuit from "../circuits/target/noir_solidity.json";
import VerifierArtifact from "../contract/out/Verifier.sol/HonkVerifier.json";
import StarterArtifact from "../contract/out/Starter.sol/Starter.json";
import ZKTranscriptLibArtifact from "../contract/out/Verifier.sol/ZKTranscriptLib.json";

// Constants
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // Anvil's first account
// Global test state
let anvilProcess: ChildProcess | null = null;
let publicClient: any;
let walletClient: any;
let account: any;
let verifierAddress: `0x${string}` | null = null;
let starterAddress: `0x${string}` | null = null;

// Cleanup function
const cleanup = () => {
  if (anvilProcess && !anvilProcess.killed) {
    console.log('\nCleaning up Anvil process...');
    try {
      anvilProcess.kill('SIGKILL');
    } catch (error) {
      // Process already terminated
    }
  }
};

// Handle process exit events
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  cleanup();
  process.exit(1);
});

describe("Noir Solidity Example with Ethereum Integration", () => {

  before(async () => {
    console.log("Starting Anvil...");

    // Start Anvil with higher gas limits
    anvilProcess = spawn('anvil', [
      '--port', '8545',
      '--host', '0.0.0.0',
      '--gas-limit', '50000000',
      '--code-size-limit', '50000000',
      '--disable-default-create2-deployer'
    ], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    // Wait for Anvil to start with timeout
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Anvil startup timeout'));
      }, 15000);

      anvilProcess!.stdout!.on('data', (data) => {
        if (data.toString().includes('Listening on')) {
          clearTimeout(timeout);
          resolve(void 0);
        }
      });

      anvilProcess!.stderr!.on('data', (data) => {
        console.error('Anvil error:', data.toString());
      });
    });

    // Wait longer for Anvil to be fully ready
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Setup viem clients
    account = privateKeyToAccount(PRIVATE_KEY);

    publicClient = createPublicClient({
      chain: foundry,
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
    console.log("Cleaning up...");

    if (anvilProcess) {
      console.log("Stopping Anvil...");

      try {
        // Send SIGTERM first for graceful shutdown
        anvilProcess.kill('SIGTERM');

        // Wait for process to exit gracefully
        await new Promise((resolve) => {
          const cleanup = () => {
            console.log("Anvil stopped");
            anvilProcess = null;
            resolve(void 0);
          };

          // Listen for exit events
          anvilProcess!.on('exit', cleanup);
          anvilProcess!.on('close', cleanup);

          // Force kill after 2 seconds if it doesn't exit gracefully
          setTimeout(() => {
            if (anvilProcess && !anvilProcess.killed) {
              console.log("Force killing Anvil...");
              try {
                anvilProcess.kill('SIGKILL');
              } catch (error) {
                console.log("Process already terminated");
              }
            }
            cleanup();
          }, 2000);
        });
      } catch (error) {
        console.log("Error during Anvil cleanup:", error);
        anvilProcess = null;
      }
    }

    // Force exit after cleanup to prevent hanging
    console.log("Tests completed, forcing exit...");
    setTimeout(() => {
      process.exit(0);
    }, 100);
  });

  test("should deploy contracts", async () => {
    console.log("Deploying ZKTranscriptLib library...");

    // Deploy ZKTranscriptLib library first
    const libHash = await walletClient.deployContract({
      abi: ZKTranscriptLibArtifact.abi,
      bytecode: ZKTranscriptLibArtifact.bytecode.object as `0x${string}`,
      args: [],
    });

    const libReceipt = await publicClient.waitForTransactionReceipt({ hash: libHash });
    const libAddress = libReceipt.contractAddress!;
    console.log(`ZKTranscriptLib deployed at: ${libAddress}`);

    console.log("Deploying Verifier contract...");

    // Link the library into the Verifier bytecode
    const linkedBytecode = (VerifierArtifact.bytecode.object as string).replace(
      /__\$[0-9a-fA-F]{34}\$__/g,
      libAddress.slice(2).toLowerCase()
    );

    // Deploy Verifier with linked bytecode
    const verifierHash = await walletClient.deployContract({
      abi: VerifierArtifact.abi,
      bytecode: `0x${linkedBytecode.replace(/^0x/, '')}` as `0x${string}`,
      args: [],
    });

    const verifierReceipt = await publicClient.waitForTransactionReceipt({ hash: verifierHash });
    verifierAddress = verifierReceipt.contractAddress!;
    console.log(`Verifier deployed at: ${verifierAddress}`);

    console.log("Deploying Starter contract...");

    // Deploy Starter with Verifier address
    const starterHash = await walletClient.deployContract({
      abi: StarterArtifact.abi,
      bytecode: StarterArtifact.bytecode.object as `0x${string}`,
      args: [verifierAddress],
    });

    const starterReceipt = await publicClient.waitForTransactionReceipt({ hash: starterHash });
    starterAddress = starterReceipt.contractAddress!;
    console.log(`Starter deployed at: ${starterAddress}`);

    // Verify deployment
    assert.ok(verifierAddress, "Verifier should be deployed");
    assert.ok(starterAddress, "Starter should be deployed");
  });

  test("should submit proof transaction to blockchain and verify", async () => {
    assert.ok(starterAddress, "Starter contract must be deployed first");

    console.log("Generating proof...");
    const noir = new Noir(circuit as any);
    const api = await Barretenberg.new({ threads: 1 });
    const honk = new UltraHonkBackend(circuit.bytecode, api);

    // Use valid inputs: x=3, y=3 -> 3*2+3=9 ✓
    const inputs = { x: 3, y: 3 };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness, { verifierTarget: 'evm' });

    console.log("Proof generated successfully");
    console.log(`Public inputs: ${publicInputs}`);

    // Check initial verified count
    const initialCount = await publicClient.readContract({
      address: starterAddress,
      abi: StarterArtifact.abi,
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
      abi: StarterArtifact.abi,
      functionName: 'verifyEqual',
      args: [`0x${Buffer.from(proof).toString('hex')}` as `0x${string}`, formattedPublicInputs],
    });

    console.log(`Transaction hash: ${hash}`);

    // Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);

    // Verify transaction was successful
    assert.equal(receipt.status, 'success', "Transaction should be successful");

    // Check that verified count increased
    const finalCount = await publicClient.readContract({
      address: starterAddress,
      abi: StarterArtifact.abi,
      functionName: 'getVerifiedCount',
    });
    console.log(`Final verified count: ${finalCount}`);

    assert.equal(finalCount, initialCount + 1n, "Verified count should increase by 1");
  });

});
