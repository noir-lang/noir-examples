'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import React from 'react';

export function Connect() {
  const connectors = useConnectors();
  const { connect, error } = useConnect();

  const { connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
