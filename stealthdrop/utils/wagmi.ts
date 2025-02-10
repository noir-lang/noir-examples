import { createConfig, http } from 'wagmi';
import { anvil } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  connectors: [injected()],
  transports: {
    [anvil.id]: http(),
  },
  chains: [anvil],
});
