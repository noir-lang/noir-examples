'use client';

import styles from './Page.module.css';

import React, { useState, useCallback } from 'react';
import { useOffChainVerification } from '../hooks/useOffChainVerification';
import { useOnChainVerification } from '../hooks/useOnChainVerification';
import { useMainProofGeneration } from '../hooks/useMainProofGeneration';
import { useRecursiveProofGeneration } from '../hooks/useRecursiveProofGeneration';

export default function Page() {
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [loading, setLoading] = useState(false);
  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const [input, setInput] = useState<{ x: string; y: string } | undefined>();
  const mainProofArtifacts = useMainProofGeneration(input);
  const { recursiveBackend, proofData } = useRecursiveProofGeneration(mainProofArtifacts, input);

  useOffChainVerification(recursiveBackend, proofData, stopLoading);
  useOnChainVerification(proofData);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const elements = e.currentTarget.elements;
    if (!elements) return;

    const x = elements.namedItem('x') as HTMLInputElement;
    const y = elements.namedItem('y') as HTMLInputElement;

    setInput({ x: x.value, y: y.value });
  };

  const inputsFilled = xValue.trim() !== '' && yValue.trim() !== '';
  const isDisabled = loading || !inputsFilled;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recursive!</h1>
      <p>This circuit proves that x and y are different (main proof).</p>
      <p>
        Then it feeds that proof into another circuit, which then proves it verifies (recursive
        proof).
      </p>
      <form className={styles.proofForm} onSubmit={submit}>
        <div className={styles.inputGroup}>
          <label htmlFor="x-input" className={styles.inputLabel}>
            Value of x:
          </label>
          <input
            id="x-input"
            name="x"
            type="text"
            className={styles.inputField}
            value={xValue}
            onChange={e => setXValue(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="y-input" className={styles.inputLabel}>
            Value of y:
          </label>
          <input
            id="y-input"
            name="y"
            type="text"
            className={styles.inputField}
            value={yValue}
            onChange={e => setYValue(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={isDisabled}>
          Calculate proof
        </button>
      </form>
    </div>
  );
}
