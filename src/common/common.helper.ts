import {currencyLocaleMap, ROMAN_DIGITS} from './common.constants';

export const convertToRomane = (number: number): string => {
  return ROMAN_DIGITS[number];
};
export const localizeCurrency = (amount: number, code: string): string => {
  return amount.toLocaleString(currencyLocaleMap[code], { currency: code, style: 'currency' });
};

export const getUserNameFromEmail = (email: string) => email.substring(0, email.indexOf('@'));

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
