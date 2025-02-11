import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';
import {
  useAccount,
  useConnect,
  useConnections,
  useConnectors,
  useDisconnect,
  useSignMessage,
} from 'wagmi';
import { useEligibleAddresses } from '../../hooks/useEligibleAddresses.tsx';
import { useConnectAccount } from '../../hooks/useConnectAccount.tsx';
import { MESSAGE_TO_HASH } from '../../utils/const.ts';
import { MerkleTreeContext } from '../../providers/merkleTree.tsx';

export const SignMessageStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  title,
  description,
  number,
  onContinue,
  isCompleted,
  sign,
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
        <span className="text-white text-lg">No eligible addresses found</span>
        <div className="flex items-center gap-4">
          <Button
            variant="yellow"
            selected={false}
            onClick={async () => {
              await disconnectAsync();
              connect({ connector: connectors[0] });
            }}
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
      {eligibleAddresses?.map((a: string) => {
        const isEligible = merkleTree ? merkleTree.indexOf(BigInt(a)) !== -1 : false;
        return (
          <div key={a} className="flex flex-col gap-6 mb-10">
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors ${
                !isEligible ? 'opacity-50' : ''
              }`}
              onClick={() => isEligible && setSelectedAccount(a as `0x${string}`)}
            >
              <input
                type="radio"
                checked={selectedAccount === a}
                readOnly
                disabled={!isEligible}
                className="w-5 h-5 accent-[#E4BAFF]"
              />
              <span className="text-white">{a}</span>
              {!isEligible && <span className="text-red-400 ml-2">(Not eligible)</span>}
            </div>
          </div>
        );
      })}
      {!!signature && (
        <div className="flex items-center gap-4">
          <Button
            variant="green"
            onClick={onContinue}
            className="px-8 py-4 text-lg font-normal text-white"
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
          onClick={() =>
            sign?.({ message: MESSAGE_TO_HASH, account: selectedAccount as `0x${string}` })
          }
        >
          Sign message
        </Button>
      )}
    </StepContainer>
  );
};
