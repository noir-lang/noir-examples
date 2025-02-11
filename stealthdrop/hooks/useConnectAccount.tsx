'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useConnections, useConnectors, useDisconnect } from 'wagmi';
import React from 'react';

export function useConnectAccount() {
  const connectors = useConnectors();
  const { connect, error } = useConnect();

  const { status, isConnected, address } = useAccount();
  const { disconnect, disconnectAsync, isSuccess: isDisconnected } = useDisconnect();
  const connections = useConnections();

  return {
    connect,
    error,
    status,
    disconnect,
    isConnected,
    address,
    connectors,
    connections,
    disconnectAsync,
    isDisconnected,
  };
}
