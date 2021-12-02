export interface IUserCredentials {
  name?: string,
  email: string;
  password?: string;
  token?: string;
};

export interface IUserState {
  credentials: IUserCredentials,
  isLogged: boolean,
  isAdmin: boolean,
};

export interface IUser {
  email: string,
  password: string,
  role: string,
  favourites: string[],
  cart: string[],
}