import React from 'react';

interface CheckmarkIconProps {
  className?: string;
  stroke?: string;
  bg?: string;
}

export const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  className = 'w-5 h-5',
  stroke = 'currentColor',
  bg = 'white',
}) => {
  return (
    <div className={`bg-${bg} rounded-full p-1`}>
      <svg className={className} viewBox="0 0 20 20" fill="none">
        <path
          d="M4 10L8 14L16 6"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
