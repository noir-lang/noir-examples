import type { NextApiRequest, NextApiResponse } from 'next';
import { UltraHonkBackend } from '@aztec/bb.js';
import { promises as fs } from 'fs';
import path from 'path';

// Load circuit data at module level (outside the handler)
let circuit: any = null;
let honk: UltraHonkBackend | null = null;

async function initializeCircuit() {
  if (!circuit) {
    const circuitPath = path.resolve(process.cwd(), '../../circuits/target/noir_uh_starter.json');
    const circuitData = await fs.readFile(circuitPath, 'utf-8');
    circuit = JSON.parse(circuitData);
    honk = new UltraHonkBackend(circuit.bytecode, {
      threads: 8,

      // By default, bb.js downloads CRS files to ~/.bb-crs. For serverless environments where 
      // this path isn't writable, configure an alternate path (e.g. /tmp) using crsPath option
      // crsPath: `/tmp`
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Initialize circuit if not already done
    await initializeCircuit();

    const { proof, publicInputs } = req.body;

    if (!proof || !publicInputs) {
      return res.status(400).json({
        error: 'Missing proof or publicInputs',
        verified: false
      });
    }

    if (!honk) {
      throw new Error('Backend not initialized');
    }

    // Convert proof to Uint8Array if it's not already
    let proofArray: Uint8Array;
    if (proof instanceof Uint8Array) {
      proofArray = proof;
    } else if (Array.isArray(proof)) {
      proofArray = new Uint8Array(proof);
    } else if (typeof proof === 'object' && proof !== null) {
      // Handle serialized Uint8Array (object with numeric keys)
      const values = Object.values(proof) as number[];
      proofArray = new Uint8Array(values);
    } else {
      throw new Error('Invalid proof format');
    }

    const publicInputsArray = Array.isArray(publicInputs) ? publicInputs : [publicInputs];

    const verified = await honk.verifyProof({
      proof: proofArray,
      publicInputs: publicInputsArray
    });

    return res.status(200).json({
      verified,
      message: verified ? 'Proof verified successfully' : 'Proof verification failed'
    });
  } catch (error) {
    console.error('Server-side verification error:', error);
    return res.status(500).json({
      error: String(error),
      verified: false
    });
  }
}