import React, { ReactNode } from 'react';
import { ChevronIcon } from '../Icons/ChevronIcon.tsx';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';

interface StepContainerProps {
  number: number;
  title: string;
  description?: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
  isCompleted?: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  number,
  title,
  description,
  isOpen,
  onToggle,
  children,
  isCompleted,
}) => {
  const headerContent = (
    <div className="flex items-center gap-6">
      <span className="text-xl text-[#8364B4]">{String(number).padStart(2, '0')}</span>
      <span className="text-white text-lg">{title}</span>
    </div>
  );

  return (
    <div className="mb-4">
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="flex items-center justify-between px-8 py-6 rounded-xl bg-purple-glass backdrop-blur-xl border border-white/10 cursor-pointer hover:bg-purple-glass-dark transition-colors"
        >
          {headerContent}
          {isCompleted && <CheckmarkIcon />}
        </div>
      ) : (
        <div className="rounded-[32px] bg-purple-glass backdrop-blur-xl border border-white/10 overflow-hidden">
          <div
            onClick={onToggle}
            className="flex items-center justify-between px-8 py-6 cursor-pointer hover:bg-purple-glass-dark/50 transition-colors"
          >
            {headerContent}
            {isCompleted && <CheckmarkIcon />}
          </div>
          <div className="px-10 pb-10">
            {description && (
              <p className="text-[#B69DD0] text-xl font-light mb-10 tracking-wide">{description}</p>
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
