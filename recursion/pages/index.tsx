import React from 'react';
import Component from '../components/component';
import { WagmiConfig, createConfig, configureChains, useAccount,  } from 'wagmi'
import { localhost } from "wagmi/chains"
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Connect } from '../components/connect';
import { Connected } from '../components/connected';
import { Providers } from './providers';



export default function Page() {
  return (
    <Providers>
        <Connect />
        <Connected>
          <Component />
        </Connected>
    </Providers>
  );
}
