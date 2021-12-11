import ProductItemInterface from './product-item.model';

export interface IUserCredentials {
  name?: string;
  email: string;
  password?: string;
  token?: string;
}

export interface IUserState {
  credentials: IUserCredentials;
  favorites: Array<ProductItemInterface>;
  isLogged: boolean;
  isAdmin: boolean;
}

export interface IUser {
  email: string;
  password: string;
  role: string;
  favourites: Array<ProductItemInterface>;
  cart: Array<ProductItemInterface>;
}
