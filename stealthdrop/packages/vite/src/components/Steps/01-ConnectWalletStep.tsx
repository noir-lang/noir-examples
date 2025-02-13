import React from 'react';
import { Button } from '../Button.tsx';
import { StepContainer } from './StepContainer.tsx';
import { type StepProps } from '../../../../../types.ts';
import { useConnectAccount } from '../../hooks/useConnectAccount.tsx';

export const ConnectWalletStep: React.FC<StepProps> = ({
  number,
  title,
  description,
  onContinue,
  isOpen,
  onToggle,
  isCompleted,
  sign,
  resetForm,
}) => {
  const { isConnected, connectors, disconnect, connect } = useConnectAccount();

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || isConnected}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <Button
          onClick={
            isConnected
              ? () => {
                  disconnect();
                  resetForm?.();
                }
              : () => connect({ connector: connectors[0] })
          }
          variant={'yellow'}
          className={`px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal ${
            isConnected ? 'text-white' : 'text-[#32204F]'
          } flex items-center justify-center gap-2 w-full sm:w-auto`}
        >
          {isConnected && (
            <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10L8 14L16 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isConnected ? 'Disconnect' : 'Connect Wallet'}
        </Button>
        <Button
          variant="purple"
          onClick={onContinue}
          className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-white disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          Continue
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-400 italic text-center sm:text-left">
        Pro tip: Connect multiple addresses for a faster claim! 🚀
      </p>
    </StepContainer>
  );
};
