import WebApp from '@twa-dev/sdk';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { IpInfoProvider, TelegramUIProvider, TonProvider } from './providers';

import './index.css';

WebApp.ready();
WebApp.expand();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonProvider>
    <TelegramUIProvider>
      <IpInfoProvider>
        <App />
      </IpInfoProvider>
    </TelegramUIProvider>
  </TonProvider>,
);
