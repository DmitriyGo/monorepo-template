export enum WalletConnectStatus {
  connecting = 'Connecting',
  disconnected = 'Disconnected',
  idle = 'Idle',
  connected = 'Connected',
}

export enum WalletNetworkCompatibility {
  TON = 'TON',
}

export enum Networks {
  TON = 'TON',
}

export type TonWallet = 'TonWallet';

export interface IWallet {
  address: string;
  networkCompatibility: WalletNetworkCompatibility | null;
  wallet: TonWallet | null;
}

export interface IWalletActions {
  triggerTonConnection: () => void;

  handleConnection: (
    address: string,
    wallet: TonWallet,
    compatibility: WalletNetworkCompatibility,
  ) => void;

  disconnect: () => void;
}

export interface IWalletStore extends IWallet, IWalletActions {
  connectStatus: WalletConnectStatus;
}
