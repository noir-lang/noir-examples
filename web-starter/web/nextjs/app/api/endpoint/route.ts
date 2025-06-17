import { NextRequest, NextResponse } from 'next/server';
import { UltraHonkBackend } from '@aztec/bb.js';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { proof, publicInputs } = await req.json();
    console.log('Received proof:', proof);
    console.log('Received publicInputs:', publicInputs);

    // Read the circuit JSON file at runtime
    const circuitPath = path.resolve(process.cwd(), '../../circuits/target/noir_uh_starter.json');
    const circuitData = await fs.readFile(circuitPath, 'utf-8');
    const circuit = JSON.parse(circuitData);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 8 });
    const verified = await honk.verifyProof({ proof, publicInputs });
    return NextResponse.json({ verified });
  } catch (error) {
    console.error('Server-side verification error:', error);
    return NextResponse.json({ error: String(error), verified: false }, { status: 500 });
  }
} 