import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { type StepProps } from '../../../../types.ts';
import { useAccount, useConnect, useConnectors } from 'wagmi';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';
import { useClaim } from '../../hooks/useClaimer.ts';
import { useAppKit, useDisconnect } from '@reown/appkit/react';

export const ClaimStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  number,
  title,
  description,
  isCompleted,
  resetForm,
  plume,
}) => {
  const { addresses, address } = useAccount();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { eligibleAddresses, nonEligibleAddresses, isLoading } = useEligibleAddresses(
    addresses as `0x${string}`[],
  );
  const { disconnect } = useDisconnect();
  const { open, close } = useAppKit();

  const { claim, proofStatus, writeStatus, txStatus, txData, proof, reset } = useClaim(
    plume,
    selectedAccount as `0x${string}`,
  );

  const handleNonEligibleAddresses = () => {
    if (nonEligibleAddresses.length === 0) {
      return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="yellow"
              selected={false}
              onClick={async () => {
                await disconnect();
                open();
              }}
              className="w-full sm:w-auto text-center"
            >
              Connect a different address
            </Button>{' '}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        {accountSelector()}
        <p className="mt-4 text-sm text-gray-400 italic text-center sm:text-left">
          Heads up, you need around 0.0001 Holesky ETH to claim!
          <br />
          (takes around 10 seconds on the link below) 🚀
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <Button
            variant="yellow"
            onClick={claim}
            disabled={!plume || !selectedAccount}
            className="text-white w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-[#32204F]"
          >
            {!plume ? 'Sign message first!' : 'Claim'}
          </Button>{' '}
          <Button
            variant="purple"
            selected={false}
            onClick={() => {
              window.open(`https://holesky-faucet.pk910.de`, '_blank');
            }}
            className="w-full sm:w-auto text-center text-white"
          >
            I need some Holesky ETH please!
          </Button>
        </div>
      </div>
    );
  };

  const accountSelector = () => {
    return nonEligibleAddresses?.map((a: string) => {
      return (
        <div key={a} className="flex flex-col gap-4">
          <div
            className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-white/10 cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors`}
            onClick={() => setSelectedAccount(a)}
          >
            <input
              type="radio"
              checked={selectedAccount === a}
              readOnly
              className="w-4 sm:w-5 h-4 sm:h-5 accent-[#E4BAFF]"
            />
            <span className="text-white text-sm sm:text-base break-all">{a}</span>
          </div>
        </div>
      );
    });
  };

  const renderContent = () => {
    if (proofStatus === 'idle' && writeStatus === 'idle') {
      return handleNonEligibleAddresses();
    } else if (proofStatus === 'success' && writeStatus === 'success' && txStatus === 'success') {
      return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            variant="green"
            onClick={() => {
              window.open(`https://holesky.beaconcha.in/tx/${txData?.transactionHash}`, '_blank');
            }}
            className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-white flex items-center justify-center gap-2"
          >
            <CheckmarkIcon bg="none" />
            Claim successful
          </Button>
        </div>
      );
    } else if (proofStatus === 'error' || writeStatus === 'error' || txStatus === 'error') {
      return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            onClick={() => {
              reset();
              resetForm?.();
            }}
            variant="red"
            className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-white"
          >
            Claim failed
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="space-y-4 sm:space-y-6">
            {accountSelector()}
            <Button
              variant="yellow"
              className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal text-[#32204F] flex items-center justify-center gap-2"
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
              {proofStatus === 'executing'
                ? 'Executing...'
                : proofStatus === 'proving'
                ? 'Proving...'
                : proofStatus === 'success' && writeStatus === 'pending'
                ? 'Writing to chain...'
                : 'Processing claim...'}
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted}
    >
      {renderContent()}
    </StepContainer>
  );
};
