import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'success' | 'loading';
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  icon,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} {...props}>
      {icon && (
        <img
          loading="lazy"
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt=""
        />
      )}
      {children}
    </button>
  );
};
