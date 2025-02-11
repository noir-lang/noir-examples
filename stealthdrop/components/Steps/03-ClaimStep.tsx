import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';
import { useAccount, useConnect, useConnectors, useDisconnect, useSignMessage } from 'wagmi';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';
import { hashMessage } from 'viem';
import { MESSAGE_TO_HASH } from '../../utils/const.ts';
import { useClaim } from '../../hooks/useClaimer.ts';

export const ClaimStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  number,
  title,
  description,
  isCompleted,
  resetForm,
  signature,
}) => {
  const { addresses, address } = useAccount();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { eligibleAddresses, nonEligibleAddresses, isLoading } = useEligibleAddresses(
    addresses as `0x${string}`[],
  );
  const { disconnectAsync } = useDisconnect();
  const { connect } = useConnect();
  const connectors = useConnectors();

  const { claim, proofStatus, writeStatus, txStatus, proof, reset } = useClaim(
    signature as `0x${string}`,
    hashMessage(MESSAGE_TO_HASH, 'hex') as `0x${string}`,
    selectedAccount as `0x${string}`,
  );

  const handleNonEligibleAddresses = () => {
    if (nonEligibleAddresses.length === 0) {
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="yellow"
              selected={false}
              onClick={async () => {
                await disconnectAsync();
                connect({ connector: connectors[0] });
              }}
            >
              Connect a different address
            </Button>
          </div>
        </div>
      );
    }

    return (
      <>
        {nonEligibleAddresses?.map((a: string) => {
          return (
            <div key={a} className="flex flex-col gap-6 mb-10">
              <div
                className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors`}
                onClick={() => setSelectedAccount(a)}
              >
                <input
                  type="radio"
                  checked={selectedAccount === a}
                  readOnly
                  className="w-5 h-5 accent-[#E4BAFF]"
                />
                <span className="text-white">{a}</span>
              </div>
            </div>
          );
        })}
        <Button
          variant="yellow"
          onClick={claim}
          disabled={!signature}
          className="px-8 py-4 text-lg font-normal text-[#32204F]"
        >
          {!signature ? 'Sign message first!' : 'Claim'}
        </Button>
      </>
    );
  };

  const renderContent = () => {
    console.log(proofStatus, writeStatus, txStatus);
    if (
      proofStatus === 'executing' ||
      proofStatus === 'proving' ||
      (proofStatus === 'success' && writeStatus === 'pending')
    ) {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="yellow"
            className="px-8 py-4 text-lg font-normal text-[#32204F] flex items-center gap-2"
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
            {proofStatus === 'executing'
              ? 'Executing...'
              : proofStatus === 'proving'
                ? 'Proving...'
                : proofStatus === 'success' && writeStatus === 'pending'
                  ? 'Writing to chain...'
                  : 'Processing claim...'}
          </Button>
        </div>
      );
    } else if (proofStatus === 'success' && writeStatus === 'success' && txStatus === 'success') {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="green"
            className="px-8 py-4 text-lg font-normal text-white flex items-center gap-2"
          >
            <CheckmarkIcon bg="none" />
            Claim successful
          </Button>
        </div>
      );
    } else if (proofStatus === 'error' || writeStatus === 'error' || txStatus === 'error') {
      return (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              reset();
              resetForm?.();
            }}
            variant="red"
            className="px-8 py-4 text-lg font-normal text-white"
          >
            Claim failed
          </Button>
        </div>
      );
    } else {
      return handleNonEligibleAddresses();
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
