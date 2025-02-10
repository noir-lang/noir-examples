import React from 'react';

interface HeaderProps {
  connectedAddress?: string;
  onDisconnect?: () => void;
}

const Header: React.FC<HeaderProps> = ({ connectedAddress, onDisconnect }) => {
  if (!connectedAddress) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-black">
      <div className="w-full h-[96px]">
        <div className="max-w-[1440px] h-full mx-auto">
          <div className="flex items-center justify-end gap-8 h-full px-16">
            <div className="text-right">
              <span className="text-base font-medium text-white">Connected to: </span>
              <span className="text-base font-light text-white">{connectedAddress}</span>
            </div>
            <button
              onClick={onDisconnect}
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
