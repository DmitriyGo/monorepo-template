import CryptoJS from 'crypto-js';

/**
 * Parses the initData query string into an object.
 * @param {string} queryString - The initData query string.
 * @returns {Record<string, string>} The parsed query parameters.
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const pairs = queryString.split('&');

  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return params;
};

export const verifyTelegramWebAppData = (telegramInitData: string, botToken: string): boolean => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get('hash');
  const dataToCheck: string[] = [];

  initData.sort();
  initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

  const secret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

  return _hash === hash;
};
