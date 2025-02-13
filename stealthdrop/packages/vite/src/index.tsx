// @ts-ignore
import acvm from '@noir-lang/acvm_js/web/acvm_js_bg.wasm?url';
// @ts-ignore
import noirc from '@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url';
import initNoirC from '@noir-lang/noirc_abi';
import initACVM from '@noir-lang/acvm_js';
// @ts-ignore
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MerkleTreeProvider } from './providers/merkleTree.tsx';
import StealthDropApp from './components/StealthDrop/StealthDropApp.tsx';

import { WagmiProvider } from 'wagmi';
import { config } from '../../../utils/wagmi.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <MerkleTreeProvider>
        <StealthDropApp />
      </MerkleTreeProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
