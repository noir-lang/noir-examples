import React, { useState } from 'react';
import Header from '../Header.tsx';
import StealthDropLogo from './StealthDropLogo.tsx';
import StepList from '../Steps/StepList.tsx';

const StealthDropApp: React.FC = () => {
  const [resetForm, setResetForm] = useState(() => () => {});

  return (
    <div className="min-h-screen bg-[#32204F] relative">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("/background.svg")' }}
      />
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
