import CryptoJS from 'crypto-js';

/**
 * Generates a HMAC-SHA-256 signature.
 * @param {string} key - The secret key.
 * @param {string} data - The data to sign.
 * @returns {string} The hexadecimal representation of the HMAC-SHA-256 signature.
 */
export const generateHmac = (key: string, data: string): string => {
  return CryptoJS.HmacSHA256(data, key).toString(CryptoJS.enc.Hex);
};
