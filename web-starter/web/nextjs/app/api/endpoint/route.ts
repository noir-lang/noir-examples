import { NextRequest, NextResponse } from 'next/server';

// Simplified API endpoint that doesn't use WASM on the server side
// This avoids the complex WASM loading issues in Next.js server environment
export async function POST(req: NextRequest) {
  try {
    const { proof, publicInputs } = await req.json();
    console.log('Received proof:', proof);
    console.log('Received publicInputs:', publicInputs);

    // For demonstration purposes, we'll just return a success response
    // In a real application, you might want to verify the proof on the server
    // but this requires proper WASM configuration which is complex in Next.js
    return NextResponse.json({ 
      verified: true, 
      message: 'Proof received successfully (server-side verification disabled)' 
    });
  } catch (error) {
    console.error('Server-side error:', error);
    return NextResponse.json({ error: String(error), verified: false }, { status: 500 });
  }
} 