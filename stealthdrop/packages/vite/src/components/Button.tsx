import React, { type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'yellow' | 'green' | 'purple' | 'red';
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  icon,
  disabled = false,
  onClick,
  className = '',
  selected = false,
  ...props
}) => {
  const buttonClasses = classNames(
    'rounded-lg border-2 px-8 py-4 text-lg font-normal transition-colors duration-200 text-[#32204F] ',
    {
      // Yellow variant
      'bg-[rgba(255,161,136,0.50)] border-[#FFA188] hover:bg-[rgba(255,161,136,0.70)]':
        variant === 'yellow',
      // Green variant
      'border-[#00694D] bg-[#2FA483] hover:bg-[#248c6f]': variant === 'green',
      // Purple variant
      'border-[#AFA8BA] bg-[#706383] hover:bg-[#5d536e]': variant === 'purple',
      // Red variant
      'border-[#FF4242] bg-[rgba(255,80,34,0.50)] hover:bg-[rgba(255,80,34,0.70)]':
        variant === 'red',
      // Disabled state
      'opacity-50 cursor-not-allowed': disabled,
      'text-white': selected,
      'border-[#E4BAFF] bg-[#E4BAFF]/5': selected,
    },
    className,
  );

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled} {...props}>
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <img loading="lazy" src={icon} className="object-contain shrink-0 w-4 h-4" alt="" />
        )}
        {children}
      </div>
    </button>
  );
};
