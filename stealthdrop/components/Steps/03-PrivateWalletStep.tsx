import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';

interface PrivateWalletStepProps {
  isOpen: boolean;
  onToggle: () => void;
  number: number;
  onContinue?: () => void;
  isCompleted: boolean;
}

export const PrivateWalletStep: React.FC<PrivateWalletStepProps> = ({
  isOpen,
  onToggle,
  number,
  onContinue,
  isCompleted,
}) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSwitchWallet = () => {
    setIsWalletConnected(true);
  };

  const renderButtons = () => {
    if (isWalletConnected) {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="success"
            className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center gap-2"
          >
            <CheckmarkIcon />
            Wallet connected
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
    }

    return (
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          onClick={handleSwitchWallet}
          className="relative px-8 py-4 rounded-xl text-lg font-normal bg-[#E4BAFF] hover:bg-[#d9a6ff] text-[#32204F] transition-colors"
        >
          Switch wallet
        </Button>
        <Button
          variant="secondary"
          className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4A3671] text-white hover:bg-[#553f82] transition-colors"
        >
          Continue with same wallet
        </Button>
      </div>
    );
  };

  return (
    <StepContainer
      number={number}
      title="Switch to the private wallet"
      description="Connect the wallet you want to claim the airdrop with."
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || isWalletConnected}
    >
      {renderButtons()}
    </StepContainer>
  );
};
