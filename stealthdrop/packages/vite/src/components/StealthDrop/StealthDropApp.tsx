import React, { useState, useEffect } from 'react';
import Header from '../Header.tsx';
import StealthDropLogo from './StealthDropLogo.tsx';
import StepList from '../Steps/StepList.tsx';
import { useAppKitNetwork } from '@reown/appkit/react';
import { holesky } from '@reown/appkit/networks';

const StealthDropApp: React.FC = () => {
  const [resetForm, setResetForm] = useState(() => () => {});
  const [showDemoModal, setShowDemoModal] = useState(true);

  const { caipNetworkId, switchNetwork } = useAppKitNetwork();

  useEffect(() => {
    if (caipNetworkId !== 'eip155:80001') {
      switchNetwork(holesky);
    }
  }, [caipNetworkId]);

  return (
    <div className="min-h-screen bg-[#32204F] relative">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("/background.svg")' }}
      />
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#32204F] border border-[#E4BAFF]/20 rounded-2xl p-6 max-w-lg w-full shadow-xl">
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-white">Stealthdrop Demo</h2>
              <p className="text-[#B69DD0] text-base">
                Stealthdrop allows for private Airdrops.
                <br />
                <br />
                Using PLUME nullifiers, a protocol can airdrop to users allowing them to claim with
                an address not linked to the eligible user.
                <br />
                <br />
                The PLUME nullifier is a work in progress. It requires wallets to implement{' '}
                <a
                  href="https://eips.ethereum.org/EIPS/eip-7524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4BAFF] hover:text-[#E4BAFF]/80 transition-colors underline"
                >
                  ERC-7524
                </a>{' '}
                . For now, the nullifier is mocked, but the proof is generated client-side with{' '}
                <a
                  href="https://noir-lang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4BAFF] hover:text-[#E4BAFF]/80 transition-colors underline"
                >
                  Noir
                </a>{' '}
                .
                <br />
                <br />
                Support for ERC-7524 is growing, check out the{' '}
                <a
                  href="https://github.com/plume-sig/zk-nullifier-sig"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  zk-nullifier-sig
                </a>{' '}
                repository for more info.
              </p>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-[#4A3671] hover:bg-[#553f82] transition-colors rounded-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="relative z-10 flex flex-col px-20 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-start rounded-full max-md:max-w-full">
          <div className="flex overflow-hidden flex-col items-center pb-32 w-full max-md:pb-24 max-md:max-w-full">
            <Header resetForm={resetForm} />
            <StealthDropLogo />
            <StepList resetForm={resetForm} setResetForm={setResetForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StealthDropApp;
