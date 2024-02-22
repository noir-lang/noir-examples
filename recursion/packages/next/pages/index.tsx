'use client';

import React, { useState } from 'react';
import { useOffChainVerification } from '../hooks/useOffChainVerification';
import { useOnChainVerification } from '../hooks/useOnChainVerification';
import { useMainProofGeneration } from '../hooks/useMainProofGeneration';
import { useRecursiveProofGeneration } from '../hooks/useRecursiveProofGeneration';

export default function Page() {
  const [input, setInput] = useState<{ x: string; y: string } | undefined>();
  const mainProofArtifacts = useMainProofGeneration(input);
  const { recursiveNoir, proofData } = useRecursiveProofGeneration(mainProofArtifacts, input);

  useOffChainVerification(recursiveNoir, proofData);
  useOnChainVerification(proofData);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    if (!elements) return;

    const x = elements.namedItem('x') as HTMLInputElement;
    const y = elements.namedItem('y') as HTMLInputElement;

    setInput({ x: x.value, y: y.value });
  };

  return (
    <form className="gameContainer" onSubmit={submit}>
      <h1>Recursive!</h1>
      <p>This circuit proves that x and y are different (main proof)</p>
      <p>
        Then it feeds that proof into another circuit, which then proves it verifies (recursive
        proof)
      </p>
      <h2>Try it!</h2>
      <input name="x" type={'text'} />
      <input name="y" type={'text'} />
      <button type="submit">Calculate proof</button>
    </form>
  );
}
