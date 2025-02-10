'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import React from 'react';

export function useConnectAccount() {
  const connectors = useConnectors();
  const { connect, error } = useConnect();

  const { status, isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  return { connect, error, status, disconnect, isConnected, address };
}
