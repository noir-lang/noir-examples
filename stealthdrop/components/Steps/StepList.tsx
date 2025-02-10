import React, { useState } from 'react';
import { ConnectWalletStep } from './01-ConnectWalletStep.tsx';
import { SignMessageStep } from './02-SignMessageStep.tsx';
import { PrivateWalletStep } from './03-PrivateWalletStep.tsx';
import { ProveOwnershipStep } from './04-ClaimStep.tsx';
import { Step, StepProps } from '../../types.ts';

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
    title: 'Switch to the private wallet',
    description: 'Switch to the private wallet you want to claim the airdrop with.',
  },
  {
    title: 'Claim',
    description:
      'Claim tokens by submitting a transaction containing the ZK proof to the ERC-20 contract on-chain.',
  },
];

const StepList: React.FC = () => {
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleStepToggle = (index: number) => {
    setOpenStepIndex(openStepIndex === index ? null : index);
  };

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
            key: index,
            title: step.title,
            description: step.description,
            number: index + 1,
            isOpen: openStepIndex === index,
            onToggle: () => handleStepToggle(index),
            isCompleted: completedSteps[index],
          };

          if (index === 1) {
            return (
              <SignMessageStep
                {...commonProps}
                onContinue={() => {
                  handleStepComplete(index);
                  handleStepToggle(index + 1);
                }}
              />
            );
          }
          if (index === 2) {
            return (
              <PrivateWalletStep
                {...commonProps}
                onContinue={() => {
                  handleStepComplete(index);
                  handleStepToggle(index + 1);
                }}
              />
            );
          }
          if (index === 3) {
            return (
              <ProveOwnershipStep
                {...commonProps}
                onContinue={() => {
                  handleStepComplete(index);
                  handleStepToggle(index + 1);
                }}
              />
            );
          }
          return (
            <ConnectWalletStep
              key={index}
              {...step}
              number={index + 1}
              isConnected={index === 0}
              isOpen={openStepIndex === index}
              onToggle={() => handleStepToggle(index)}
              isCompleted={completedSteps[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepList;
