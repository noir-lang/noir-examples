import React from 'react';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon.tsx';

interface StepContainerProps {
  number: string | number;
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted?: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  number,
  title,
  description,
  children,
  isOpen,
  onToggle,
  isCompleted,
}) => {
  const headerContent = (
    <div className="flex items-center gap-4 min-w-0">
      <span className="text-[#8364B4] text-xl md:text-2xl font-medium shrink-0">
        {String(number).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h2 className="text-white text-lg md:text-xl font-medium truncate">{title}</h2>
        {isOpen && description && (
          <p className="text-[#B69DD0] text-base md:text-lg mt-2 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 rounded-xl bg-[#32204F]/30 backdrop-blur-xl border border-white/10 cursor-pointer hover:bg-[#32204F]/40 transition-colors"
        >
          {headerContent}
          <div className="ml-auto shrink-0">
            {isCompleted ? (
              <div className="w-6 h-6 md:w-8 md:h-8">
                <CheckmarkIcon />
              </div>
            ) : (
              <svg
                className="w-6 h-6 md:w-8 md:h-8 transform transition-transform"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 9L12 16L5 9"
                  stroke="#9D7BB5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-[24px] sm:rounded-[32px] bg-[#32204F]/30 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div
            onClick={onToggle}
            className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 cursor-pointer hover:bg-[#32204F]/40 transition-colors"
          >
            {headerContent}
            <div className="ml-auto shrink-0">
              {isCompleted ? (
                <div className="w-6 h-6 md:w-8 md:h-8">
                  <CheckmarkIcon />
                </div>
              ) : (
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 transform rotate-180 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 9L12 16L5 9"
                    stroke="#9D7BB5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="px-6 sm:px-10 pb-6 sm:pb-10 space-y-6">{children}</div>
        </div>
      )}
    </div>
  );
};
