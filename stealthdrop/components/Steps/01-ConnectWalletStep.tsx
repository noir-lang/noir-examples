import React from 'react';
import { Button } from '../Button.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';
import { useConnectAccount } from '../../hooks/useConnectAccount.tsx';

export const ConnectWalletStep: React.FC<StepProps> = ({
  number,
  title,
  description,
  onContinue,
  isOpen,
  onToggle,
  isCompleted,
}) => {
  const { connect, isConnected } = useConnectAccount();

  const renderButtons = () => {
    if (!isConnected) {
      return (
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E4BAFF] via-[#FFB4B4] to-[#B69DD0]" />
          <Button
            variant="primary"
            className="relative px-8 py-4 rounded-xl text-xl font-light text-white bg-[#B69DD0] hover:bg-[#a58bc0] transition-colors m-[1px]"
          >
            Connect wallet
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-4 items-center">
        <Button
          variant={isConnected ? 'success' : 'primary'}
          className={`px-8 py-4 rounded-xl text-lg font-normal ${
            isConnected
              ? 'bg-[#4CAF50] hover:bg-[#45a049] text-white'
              : 'bg-[#E4BAFF] hover:bg-[#d9a6ff] text-[#32204F]'
          } transition-colors flex items-center gap-2`}
        >
          {isConnected && (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10L8 14L16 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isConnected ? 'Wallet connected' : 'Connect Wallet'}
        </Button>
        <Button
          variant="secondary"
          onClick={onContinue}
          className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4A3671] text-white hover:bg-[#553f82] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    );
  };

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || isConnected}
    >
      {renderButtons()}
    </StepContainer>
  );
};
