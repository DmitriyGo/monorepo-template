import {
  TonConnectUIProvider,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import useWalletStore from '@/store/walletStore';
import { WalletConnectStatus, WalletNetworkCompatibility } from '@/store/walletStore/types';

// const TON_APP_MANIFEST_URL =
// 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';
const TON_APP_MANIFEST_URL = `${import.meta.env.VITE_FRONTEND_URL}/ton-manifest.json`;

const TonConnectionHandlerProvider = ({ children }: { children: ReactNode }) => {
  const {
    triggerTonConnection,
    handleConnection,
    disconnect,
    networkCompatibility,
    connectStatus,
  } = useWalletStore(state => state);
  const modal = useTonConnectModal();
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const modalStatus = modal.state.status;
    const closeReason = modal.state.closeReason;
    if (modalStatus === 'closed' && closeReason === 'action-cancelled') {
      disconnect();
      return;
    }
    if (modalStatus === 'opened' && !address) {
      triggerTonConnection();
      return;
    }
    if (address && address.length > 0) {
      if (
        networkCompatibility !== null &&
        networkCompatibility !== WalletNetworkCompatibility.TON &&
        connectStatus === WalletConnectStatus.connected
      ) {
        tonConnectUI.disconnect();
        return;
      }
      handleConnection(address, 'TonWallet', WalletNetworkCompatibility.TON);
    }
  }, [
    address,
    handleConnection,
    modal.state.closeReason,
    modal.state.status,
    disconnect,
    triggerTonConnection,
    networkCompatibility,
    connectStatus,
    tonConnectUI,
  ]);

  return children;
};

export const TonProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TonConnectUIProvider manifestUrl={TON_APP_MANIFEST_URL}>
      <TonConnectionHandlerProvider>{children}</TonConnectionHandlerProvider>
    </TonConnectUIProvider>
  );
};
