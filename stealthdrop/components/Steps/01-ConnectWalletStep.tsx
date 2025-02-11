import React, { useEffect } from 'react';
import { Button } from '../Button.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';
import { useConnectAccount } from '../../hooks/useConnectAccount.tsx';
import { useConnectors, useConnect, useDisconnect } from 'wagmi';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';

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
      <div className="flex gap-4 items-center">
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
          className={`px-8 py-4 text-lg font-normal ${
            isConnected ? 'text-white' : 'text-[#32204F]'
          } flex items-center gap-2`}
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
          {isConnected ? 'Disconnect' : 'Connect Wallet'}
        </Button>
        <Button
          variant="purple"
          onClick={onContinue}
          className="px-8 py-4 text-lg font-normal text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-400 italic">
        Pro tip: Connect multiple addresses for a faster claim! 🚀
      </p>
    </StepContainer>
  );
};
