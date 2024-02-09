import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { WagmiConfig } from 'wagmi';
import { config } from '../utils/wagmi';
import { useEffect, useState } from 'react';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
      <ToastContainer />
    </Providers>
  );
}
