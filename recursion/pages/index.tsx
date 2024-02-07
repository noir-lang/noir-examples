'use client';

import React, { useState } from 'react';
import { useOffChainVerification } from '../hooks/useOffChainVerification.jsx';
import { useOnChainVerification } from '../hooks/useOnChainVerification.jsx';
import { useMainProofGeneration } from '../hooks/useMainProofGeneration.jsx';
import { useRecursiveProofGeneration } from '../hooks/useRecursiveProofGeneration.jsx';

export default function Page() {
  const [input, setInput] = useState<{ x: string; y: string } | undefined>();
  const mainProofArtifacts = useMainProofGeneration(input);
  const { recursiveBackend, proofData } = useRecursiveProofGeneration(mainProofArtifacts, input);

  useOffChainVerification(recursiveBackend, proofData);
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
