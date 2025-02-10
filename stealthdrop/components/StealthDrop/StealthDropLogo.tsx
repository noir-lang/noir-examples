import React from 'react';

const StealthDropLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-16 max-w-full w-[382px] max-md:mt-10">
      <div className="flex items-start mt-6 w-full whitespace-nowrap max-md:text-4xl">
        <div className="text-white font-galaxie text-[60px] font-light leading-[123%] tracking-[-0.02em] max-md:text-4xl">
          Stealth
        </div>
        <div className="font-galaxie text-[60px] font-light leading-[123%] tracking-[-0.02em] max-md:text-4xl mt-5 bg-gradient-to-t from-[#E4BAFF] from-25% to-transparent bg-clip-text text-transparent">
          Drop
        </div>
      </div>
      <div className="mt-6 text-base font-bold leading-none text-white">
        Private zk-SNARK Airdrops
      </div>
    </div>
  );
};

export default StealthDropLogo;
