import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { type StepProps } from '../../../../../types.ts';
import { useAccount } from 'wagmi';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';
import { useConnectAccount } from '../../hooks/useConnectAccount.tsx';
import { MerkleTreeContext } from '../../providers/merkleTree.tsx';

export const SignMessageStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  title,
  description,
  number,
  onContinue,
  isCompleted,
  plumeSign,
  signature,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<`0x${string}` | null>(null);
  const { addresses } = useAccount();
  const { eligibleAddresses, nonEligibleAddresses, isLoading } = useEligibleAddresses(
    addresses as `0x${string}`[],
  );
  const merkleTree = useContext(MerkleTreeContext);

  const { isConnected, connectors, disconnect, connect, connections, disconnectAsync } =
    useConnectAccount();

  if (!eligibleAddresses || eligibleAddresses.length === 0) {
    return (
      <StepContainer
        number={number}
        title={title}
        description={description}
        isOpen={isOpen}
        onToggle={onToggle}
        isCompleted={isCompleted || !!signature}
      >
        <span className="text-white text-base sm:text-lg">No eligible addresses found</span>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            variant="yellow"
            selected={false}
            onClick={async () => {
              await disconnectAsync();
              connect({ connector: connectors[0] });
            }}
            className="w-full sm:w-auto text-center"
          >
            Connect more addresses
          </Button>
        </div>
      </StepContainer>
    );
  }

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || !!signature}
    >
      <div className="space-y-4 sm:space-y-6">
        {eligibleAddresses?.map((a: string) => {
          const isEligible = merkleTree ? merkleTree.indexOf(BigInt(a)) !== -1 : false;
          return (
            <div key={a} className="flex flex-col gap-4">
              <div
                className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-white/10 cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors ${
                  !isEligible ? 'opacity-50' : ''
                }`}
                onClick={() => isEligible && setSelectedAccount(a as `0x${string}`)}
              >
                <input
                  type="radio"
                  checked={selectedAccount === a}
                  readOnly
                  disabled={!isEligible}
                  className="w-4 sm:w-5 h-4 sm:h-5 accent-[#E4BAFF]"
                />
                <span className="text-white text-sm sm:text-base break-all">{a}</span>
                {!isEligible && (
                  <span className="text-red-400 text-sm sm:text-base ml-2 shrink-0">
                    (Not eligible)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!!signature && (
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
      {!signature && (
        <Button
          variant="yellow"
          selected={!!selectedAccount}
          disabled={!selectedAccount}
          onClick={() => plumeSign?.(selectedAccount as `0x${string}`)}
          className="mt-6 w-full sm:w-auto"
        >
          Sign message
        </Button>
      )}
    </StepContainer>
  );
};
