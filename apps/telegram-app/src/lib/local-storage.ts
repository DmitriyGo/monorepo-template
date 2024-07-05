export enum LocalStorageKeys {
  WalletLocalStorage = 'WalletLocalStorage',
  SolAdapterWalletName = 'walletName',
}

export const getLocalStorageValue = <T>(key: LocalStorageKeys): T | null => {
  const lsValue = localStorage.getItem(key);
  if (!lsValue) return null;
  return JSON.parse(lsValue) as T;
};

export const setLocalStorageValue = <T>(key: LocalStorageKeys, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
