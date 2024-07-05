import { AppRoot } from '@telegram-apps/telegram-ui';
import type { ReactNode } from 'react';

export const TelegramUIProvider = ({ children }: { children: ReactNode }) => {
  return <AppRoot className="h-full bg-slate-700">{children}</AppRoot>;
};
