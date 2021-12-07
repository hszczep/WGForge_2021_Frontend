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
