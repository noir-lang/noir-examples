import React from 'react';
import Component from '../components/component';
import { Connect } from '../components/connect';
import { Connected } from '../components/connected';
import { WagmiProvider } from 'wagmi';
import { config } from '../utils/wagmi';
import { MerkleTreeProvider } from '../components/merkleTree';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Connect />
        <MerkleTreeProvider>
          <Component />
        </MerkleTreeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
