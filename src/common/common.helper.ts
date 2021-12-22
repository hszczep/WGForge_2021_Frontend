import { currencyLocaleMap, ROMAN_DIGITS } from './common.constants';
import { ProductPrice } from '../models/product-item.model';

export const convertToRomane = (number: number): string => {
  return ROMAN_DIGITS[number];
};
export const localizeCurrency = (amount: number, code: string): string => {
  return amount.toLocaleString(currencyLocaleMap[code], { currency: code, style: 'currency' });
};
export const formatDiscount = (discount: number, price_discount: number, show_type: string, price: ProductPrice) => {
  if (discount && show_type === 'absolute') {
    return `- ${localizeCurrency(price.amount - price_discount, price.code)}`;
  }
  if (discount && show_type === 'percent') {
    return `- ${discount}%`;
  }
  return '';
};

export const getUserNameFromEmail = (email: string) => email.substring(0, email.indexOf('@'));

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
