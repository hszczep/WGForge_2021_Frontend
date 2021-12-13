export const ROMAN_DIGITS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const currencyLocaleMap: { [key: string]: string } = {
  USD: 'en-us',
  ARS: 'es-ar',
  EUR: 'de',
  GBP: 'en-gb',
  JPY: 'ja',
  AUD: 'en-au',
  CAD: 'en-ca',
  KRW: 'ko',
  PLN: 'pl',
  SGD: 'zh-sg',
  TWD: 'zh-tw',
  CZK: 'cs',
  UAH: 'ua',
  BYN: 'be',
  KZT: 'kk',
  MXN: 'es-mx',
  BRL: 'pt-br',
  COP: 'es-co',
};
export const USER = {
  ROLES: {
    ADMIN: 'admin',
    USER: 'user',
  },
  DEFAULT_STATE: {
    isLogged: false,
    isAdmin: false,
    credentials: {
      name: '',
      email: '',
      token: '',
    },
    favorites: new Array(0),
    cart: new Array(0),
  },
};
export const PRODUCT_TYPE_MACHINERY = 'machinery';
