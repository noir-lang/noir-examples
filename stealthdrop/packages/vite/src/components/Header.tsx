import React from 'react';
import { useConnectAccount } from '../hooks/useConnectAccount.tsx';

interface HeaderProps {
  connectedAddress?: string;
  resetForm?: () => void;
}

const Header: React.FC<HeaderProps> = ({ resetForm }) => {
  const { isConnected, disconnect, address, isDisconnected } = useConnectAccount();

  if (!isConnected) {
    resetForm?.();
    return null;
  }

  return (
    <div className="hidden sm:block sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-black">
      <div className="w-full h-[96px]">
        <div className="max-w-[1440px] h-full mx-auto">
          <div className="flex items-center justify-end gap-4 sm:gap-8 h-full px-4 sm:px-16">
            <div className="text-right">
              <span className="text-sm sm:text-base font-medium text-white">Connected to: </span>
              <span className="text-sm sm:text-base font-light text-white break-all sm:break-normal">
                {address}
              </span>
            </div>
            <button
              onClick={() => disconnect()}
              className="shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium text-white bg-[#4A3671] hover:bg-[#553f82] transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
