import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';

export const ProveOwnershipStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  number,
  onContinue,
  isCompleted,
}) => {
  const [proofState, setProofState] = useState<'initial' | 'generating' | 'generated'>('initial');

  const handleGenerateProof = () => {
    setProofState('generating');
    setTimeout(() => {
      setProofState('generated');
    }, 3000);
  };

  const renderContent = () => {
    switch (proofState) {
      case 'generating':
        return (
          <div className="flex items-center gap-4">
            <Button
              variant="loading"
              className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4A3671] text-white flex items-center gap-2"
            >
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating proof...
            </Button>
          </div>
        );
      case 'generated':
        return (
          <div className="flex items-center gap-4">
            <Button
              variant="success"
              className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center gap-2"
            >
              <CheckmarkIcon bg="none" />
              Proof generated
            </Button>
            <Button
              variant="secondary"
              onClick={onContinue}
              className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4A3671] text-white hover:bg-[#553f82] transition-colors"
            >
              Continue
            </Button>
          </div>
        );
      default:
        return (
          <Button
            variant="primary"
            onClick={handleGenerateProof}
            className="px-8 py-4 rounded-xl text-lg font-normal bg-[#E4BAFF] hover:bg-[#d9a6ff] text-[#32204F] transition-colors"
          >
            Generate proof
          </Button>
        );
    }
  };

  return (
    <StepContainer
      number={number}
      title="Claim"
      description="Claim tokens by proving ownership of the eligible wallet."
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || proofState === 'generated'}
    >
      {renderContent()}
    </StepContainer>
  );
};
