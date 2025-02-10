'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import React from 'react';

export function useConnectAccount() {
  const connectors = useConnectors();
  const { connect, error } = useConnect();

  const { status } = useAccount();
  const { disconnect } = useDisconnect();

  if (status === 'connected') {
    return (
      <div>
        <button key="metamask" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button key="metamask" onClick={() => connect({ connector: connectors[0] })}>
          Connect
        </button>
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
