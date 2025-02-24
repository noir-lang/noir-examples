import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { StepContainer } from './StepContainer.tsx';
import { type StepProps } from '../../../../types.ts';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';

export const SignMessageStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  title,
  description,
  number,
  onContinue,
  isCompleted,
  plumeSign,
  plume,
}) => {
  const { eligibleAddresses } = useEligibleAddresses([]);
  const address = eligibleAddresses[0];

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || !!plume?.nullifier}
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-[#E4BAFF]/5 border-[#E4BAFF]">
            <input
              type="radio"
              checked={true}
              readOnly
              className="w-4 sm:w-5 h-4 sm:h-5 accent-[#E4BAFF] mt-1"
            />
            <div className="flex flex-col items-start">
              <span className="text-white text-sm sm:text-base">vitalik.eth</span>
              <span className="text-[#B69DD0] text-xs sm:text-sm">{address}</span>
            </div>
          </div>
        </div>
      </div>
      {!!plume?.nullifier && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <Button
            variant="green"
            onClick={onContinue}
            className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-white w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>
      )}
      {!plume?.nullifier && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <Button
            variant="yellow"
            selected={true}
            onClick={() => plumeSign?.(address as `0x${string}`)}
            className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-white w-full sm:w-auto "
          >
            Sign message
          </Button>
        </div>
      )}
    </StepContainer>
  );
};
