import React from 'react';
import { useConnectAccount } from '../hooks/useConnectAccount.tsx';

interface HeaderProps {
  connectedAddress?: string;
  onDisconnect?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { isConnected, disconnect, address } = useConnectAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-black">
      <div className="w-full h-[96px]">
        <div className="max-w-[1440px] h-full mx-auto">
          <div className="flex items-center justify-end gap-8 h-full px-16">
            <div className="text-right">
              <span className="text-base font-medium text-white">Connected to: </span>
              <span className="text-base font-light text-white">{address}</span>
            </div>
            <button
              onClick={() => disconnect()}
              className="px-6 py-2.5 rounded-xl text-base font-medium text-white bg-[#4A3671] hover:bg-[#553f82] transition-colors"
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
