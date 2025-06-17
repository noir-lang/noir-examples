import { NextRequest, NextResponse } from 'next/server';
import { UltraHonkBackend } from '@aztec/bb.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now resolve the circuit path relative to this file
const circuitPath = path.resolve(__dirname, '../../../../../circuits/target/noir_uh_starter.json');
const circuitData = await fs.readFile(circuitPath, 'utf-8');
const circuit = JSON.parse(circuitData);
const honk = new UltraHonkBackend(circuit.bytecode, { threads: 8 });

export async function POST(req: NextRequest) {
  try {
    const { proof, publicInputs } = await req.json();
    console.log('Received proof:', proof);
    console.log('Received publicInputs:', publicInputs);

    const verified = await honk.verifyProof({ proof, publicInputs });
    return NextResponse.json({ verified });
  } catch (error) {
    console.error('Server-side verification error:', error);
    return NextResponse.json({ error: String(error), verified: false }, { status: 500 });
  }
} 