import type { Account } from '@tonconnect/sdk';
import type { TonProofItemReplySuccess } from '@tonconnect/ui-react';
import axios from 'axios';

import { useTokenStore } from '@/store/telegramStore/tokenStore';

class TonProofApiService {
  host = import.meta.env.VITE_API_URL;

  async generatePayload() {
    const response = await axios.get(`${this.host}/telegram-app/ton-proof`);
    return response.data as string;
  }

  async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account) {
    try {
      const { data } = await axios.post(`${this.host}/telegram-app/check-ton-proof`, {
        address: account.address,
        network: account.chain,
        proof: {
          ...proof,
          state_init: account.walletStateInit,
        },
      });

      if (data.token) {
        const { setToken } = useTokenStore.getState();
        setToken(data.token);
      }
    } catch (e) {
      console.error('checkProof error:', e);
    }
  }

  reset() {
    const { clearToken } = useTokenStore.getState();
    clearToken();
  }
}

export const TonProofApi = new TonProofApiService();
