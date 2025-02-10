import React, { useState } from 'react';
import { Button } from '../Button.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';
import { StepContainer } from './StepContainer.tsx';
import { StepProps } from '../../types.ts';

export const SignMessageStep: React.FC<StepProps> = ({
  isOpen,
  onToggle,
  title,
  description,
  number,
  onContinue,
  isCompleted,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);

  const handleAccountSelect = (account: string) => {
    setSelectedAccount(account);
  };

  const handleSignMessage = () => {
    setIsSigned(true);
  };

  const renderButtons = () => {
    if (isSigned) {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="success"
            className="px-8 py-4 rounded-xl text-lg font-normal bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center gap-2"
          >
            <CheckmarkIcon />
            Message signed
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
      <Button
        variant="primary"
        disabled={!selectedAccount}
        onClick={handleSignMessage}
        className={`px-8 py-4 rounded-xl text-lg font-normal w-[200px] transition-colors ${
          selectedAccount
            ? 'bg-[#E4BAFF] hover:bg-[#d9a6ff] text-[#32204F]'
            : 'bg-[#4A3671] text-white opacity-50 cursor-not-allowed'
        }`}
      >
        Sign message
      </Button>
    );
  };

  return (
    <StepContainer
      number={number}
      title={title}
      description={description}
      isOpen={isOpen}
      onToggle={onToggle}
      isCompleted={isCompleted || isSigned}
    >
      <div className="flex flex-col gap-6 mb-10">
        <div
          className={`flex items-center gap-4 p-4 rounded-xl border ${
            selectedAccount === '0x23F97e73825e0f7F39146D347be95A80A31a2F6f'
              ? 'border-[#E4BAFF] bg-[#E4BAFF]/5'
              : 'border-white/10'
          } cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors`}
          onClick={() => handleAccountSelect('0x23F97e73825e0f7F39146D347be95A80A31a2F6f')}
        >
          <input
            type="radio"
            checked={selectedAccount === '0x23F97e73825e0f7F39146D347be95A80A31a2F6f'}
            readOnly
            className="w-5 h-5 accent-[#E4BAFF]"
          />
          <span className="text-white">0x23F97e73825e0f7F39146D347be95A80A31a2F6f</span>
        </div>
        <div
          className={`flex items-center gap-4 p-4 rounded-xl border ${
            selectedAccount === '0x09F11C930C8a993AF6DC714e5e39BFaD09962664'
              ? 'border-[#E4BAFF] bg-[#E4BAFF]/5'
              : 'border-white/10'
          } cursor-pointer hover:border-[#E4BAFF] hover:bg-[#E4BAFF]/5 transition-colors`}
          onClick={() => handleAccountSelect('0x09F11C930C8a993AF6DC714e5e39BFaD09962664')}
        >
          <input
            type="radio"
            checked={selectedAccount === '0x09F11C930C8a993AF6DC714e5e39BFaD09962664'}
            readOnly
            className="w-5 h-5 accent-[#E4BAFF]"
          />
          <span className="text-white">0x09F11C930C8a993AF6DC714e5e39BFaD09962664</span>
        </div>
      </div>
      {renderButtons()}
    </StepContainer>
  );
};
