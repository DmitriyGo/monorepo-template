import { AppRoot, Placeholder } from '@telegram-apps/telegram-ui';
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

import { TonProofApi } from './api/ton-proof';
import useTelegramValidation from './hooks/useTelegramValidation';
import { useTelegramStore } from './store/telegramStore';

import '@repo/ui/styles.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const validation = useTelegramStore(state => state.validationResult);

  useTelegramValidation(WebApp.initData, WebApp.initDataUnsafe);

  useEffect(() => {
    const connectWithProof = async () => {
      tonConnectUI.setConnectRequestParameters({ state: 'loading' });

      try {
        const tonProofPayload: string | null = await TonProofApi.generatePayload();

        if (!tonProofPayload) return tonConnectUI.setConnectRequestParameters(null);

        tonConnectUI.setConnectRequestParameters({
          state: 'ready',
          value: { tonProof: tonProofPayload },
        });
      } catch {
        tonConnectUI.setConnectRequestParameters(null);
      }
    };

    connectWithProof();
  }, [tonConnectUI]);

  useEffect(
    () =>
      tonConnectUI.onStatusChange(wallet => {
        if (wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
          TonProofApi.checkProof(wallet.connectItems.tonProof.proof, wallet.account);
        }
      }),
    [tonConnectUI],
  );

  return (
    <AppRoot className="h-full bg-slate-700">
      <Placeholder
        header="Midas"
        description={tonConnectUI.connected ? address : 'User is not connected.'}
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
      <div className="flex w-full flex-col items-center gap-6">
        <TonConnectButton />
        {JSON.stringify(validation, null, 2)}
      </div>
    </AppRoot>
  );
}

export default App;
