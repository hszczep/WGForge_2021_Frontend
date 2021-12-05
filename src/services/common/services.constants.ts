export const MAIN_API_URLS = {
  BASE: 'https://wg-forge-back.herokuapp.com/api/',
  PRODUCTS: 'products',
  USER: {
    BASE: 'user',
    REGISTER: 'user/register',
    LOGIN: 'user/auth',
  },
};

export const LOCAL_STORAGE_KEYS = {
  USER: 'WG-Forge-UserInfo',
};

export const METHODS: { [key: string]: 'GET' | 'POST' | 'PUT' | 'DELETE' } = {
  GET: 'GET',
  POST: 'POST',
};

export const DEFAULT_ERROR_MESSAGE = 'Database request error...';
