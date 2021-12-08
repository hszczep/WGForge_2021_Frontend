import { ROMAN_DIGITS } from './common.constants';

function convertToRomane(number: number): string {
  return ROMAN_DIGITS[number];
}

export default convertToRomane;
export const getUserNameFromEmail = (email: string) => email.substring(0, email.indexOf('@'));

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
