export const ROMAN_DIGITS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
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
  },
};
