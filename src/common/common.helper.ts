import { ROMAN_DIGITS } from './common.constants';

function convertToRomane(number: number): string {
  return ROMAN_DIGITS[number];
}

export default convertToRomane;
