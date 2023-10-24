'use client'

import { useAccount } from 'wagmi'
import React from "react"

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) return null
  return <>{children}</>
}
