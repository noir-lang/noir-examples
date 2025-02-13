import React, { useEffect, useState } from 'react';
import { ConnectWalletStep } from './01-ConnectWalletStep.tsx';
import { SignMessageStep } from './02-SignMessageStep.tsx';
import { ClaimStep } from './03-ClaimStep.tsx';
import type { Step, StepProps, StepListProps } from '../../../../../types.ts';
import { usePlume } from '../../hooks/usePlume.ts';

const steps: Step[] = [
  {
    title: 'Connect wallet',
    description: 'Connect your wallet.',
  },
  {
    title: 'Select your eligible account, and sign',
    description: 'Select the account you want to sign the message with.',
  },
  {
    title: 'Claim',
    description: 'Select a different account to claim the tokens with, and claim',
  },
];

const StepList: React.FC<StepListProps> = ({ resetForm, setResetForm }) => {
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  // passing the privateKey here but obviously the whole process is done on the wallet
  const { generatePlume, plume, resetPlume } = usePlume();

  const handleStepToggle = (index: number) => {
    setOpenStepIndex(openStepIndex === index ? null : index);
  };

  useEffect(() => {
    setResetForm(() => {
      resetPlume();
      handleStepComplete(0);
      handleStepToggle(0);
      return;
    });
  }, []);

  const handleStepComplete = (index: number) => {
    setCompletedSteps(prev => {
      const newCompleted = [...prev];
      // Mark the current step and all previous steps as completed
      for (let i = 0; i <= index; i++) {
        newCompleted[i] = true;
      }
      return newCompleted;
    });
  };

  return (
    <div className="flex justify-center w-full mt-16 max-md:mt-10">
      <div className="w-full max-w-3xl px-4">
        {steps.map((step, index) => {
          const commonProps = {
            title: step.title,
            description: step.description,
            number: index + 1,
            isOpen: openStepIndex === index,
            onToggle: () => handleStepToggle(index),
            isCompleted: completedSteps[index],
          };

          if (index === 0) {
            return (
              <ConnectWalletStep
                {...commonProps}
                key={index}
                resetForm={resetForm}
                onContinue={() => {
                  handleStepComplete(index);
                  handleStepToggle(index + 1);
                }}
              />
            );
          }

          if (index === 1) {
            return (
              <SignMessageStep
                {...commonProps}
                key={index}
                onContinue={() => {
                  handleStepComplete(index);
                  handleStepToggle(index + 1);
                }}
                resetForm={resetForm}
                plumeSign={generatePlume}
                plume={plume}
              />
            );
          }
          if (index === 2) {
            return <ClaimStep {...commonProps} key={index} plume={plume} resetForm={resetForm} />;
          }
        })}
      </div>
    </div>
  );
};

export default StepList;
