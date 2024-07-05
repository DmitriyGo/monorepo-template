import type WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

import { parseQueryString, verifyTelegramWebAppData } from '@/lib/telegram-utils';
import { useTelegramStore, TGValidationFailReason } from '@/store/telegramStore';

export interface TelegramUserData {
  auth_date: string;
  query_id: string;
  user: string;
  [key: string]: string;
}

/**
 * Custom hook to validate Telegram user's data.
 * @param {string} initData - The initData query string from Telegram.WebApp.initData.
 * @returns {ValidationResult} The result of the validation is stored in TelegramStore.
 */
const useTelegramValidation = (
  initData: string,
  initDataUnsafe: (typeof WebApp)['initDataUnsafe'],
): void => {
  const setValidationResult = useTelegramStore(state => state.setValidationResult);

  console.log('initDataUnsafe ==>', initDataUnsafe);

  const botToken = import.meta.env.VITE_TG_BOT_API_KEY;

  useEffect(() => {
    const params = parseQueryString(initData);

    if (verifyTelegramWebAppData(initData, botToken)) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const authDate = parseInt(params.auth_date, 10);
      const isRecent = currentTimestamp - authDate < 86400; // 24 hours

      setValidationResult({
        isValid: isRecent,
        reason: isRecent ? undefined : TGValidationFailReason.DATA_OUTDATED,
      });
    } else {
      setValidationResult({ isValid: false, reason: TGValidationFailReason.INVALID_HASH });
    }
  }, [initData, botToken, setValidationResult]);
};

export default useTelegramValidation;
