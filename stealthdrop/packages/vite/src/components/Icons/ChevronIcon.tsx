import React from 'react';

interface ChevronIconProps {
  className?: string;
  stroke?: string;
}

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  className = 'w-6 h-6 transition-transform',
  stroke = '#E4BAFF',
}) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
        stroke={stroke}
      />
    </svg>
  );
};
