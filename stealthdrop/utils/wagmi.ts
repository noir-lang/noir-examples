import { createConfig, http } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  connectors: [metaMask()],
  transports: {
    [localhost.id]: http(),
  },
  chains: [localhost],
});
