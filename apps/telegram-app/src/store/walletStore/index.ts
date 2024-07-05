import { create } from 'zustand';

import type { IWallet, IWalletStore, TonWallet } from './types';
import { WalletConnectStatus, WalletNetworkCompatibility } from './types';

import { LocalStorageKeys, setLocalStorageValue } from '@/lib/local-storage';

export type IWalletLocalStorage = TonWallet | 'idle';

const walletInitialState: IWallet = {
  address: '',
  networkCompatibility: null,
  wallet: null,
};

const useWalletStore = create<IWalletStore>(set => ({
  ...walletInitialState,

  connectStatus: WalletConnectStatus.idle,

  triggerTonConnection: () => {
    setLocalStorageValue<IWalletLocalStorage>(LocalStorageKeys.WalletLocalStorage, 'TonWallet');
    set({
      connectStatus: WalletConnectStatus.connecting,
      networkCompatibility: WalletNetworkCompatibility.TON,
      wallet: 'TonWallet',
    });
  },

  handleConnection: (address, wallet, compatibility) => {
    set({
      address,
      wallet,
      networkCompatibility: compatibility,
      connectStatus: WalletConnectStatus.connected,
    });
  },

  disconnect: () => {
    setLocalStorageValue<IWalletLocalStorage>(LocalStorageKeys.WalletLocalStorage, 'idle');
    set({
      ...walletInitialState,
      connectStatus: WalletConnectStatus.disconnected,
    });
  },
}));

export default useWalletStore;
