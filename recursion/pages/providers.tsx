'use client'

import * as React from 'react'
import { WagmiConfig, createConfig, configureChains, useAccount,  } from 'wagmi'
import { localhost } from "wagmi/chains"
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { config } from "../utils/wagmi"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>
}
