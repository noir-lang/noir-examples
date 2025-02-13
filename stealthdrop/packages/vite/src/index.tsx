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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createAppKit } from '@reown/appkit/react';
import { anvil, holesky, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const queryClient = new QueryClient();

const projectId = '39bbfc7f6098b7449c9dd7026286dece';

const metadata = {
  name: 'StealthDrop Noir',
  description: 'StealthDrop Noir',
  url: 'https://stealthdrop.noir.xyz',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const networks: AppKitNetwork[] = [anvil, holesky];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [networks[0], networks[1]], // Ensure array has at least one element
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
  },
  featuredWalletIds: [
    'cf14642fb8736a99b733ada71863241c823743b16e2a822b3dba24e2fa25014d', // taho
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // metamask
    'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18', // zerion
  ],
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppKitProvider>
    <MerkleTreeProvider>
      <StealthDropApp />
    </MerkleTreeProvider>
  </AppKitProvider>,
);
