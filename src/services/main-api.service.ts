import { deleteResourse, getResource, postResourse, putResourse } from './common/services.helper';
import { MAIN_API_URLS } from './common/services.constants';
import { IUser, IUserCredentials } from '../models/user.model';
import ProductItemInterface from '../models/product-item.model';

class MainApiService {
  getProducts(): Promise<Array<ProductItemInterface>> {
    return getResource(MAIN_API_URLS.PRODUCTS, { token: null });
  }

  registerUser(params: IUserCredentials): Promise<unknown> {
    return postResourse(MAIN_API_URLS.USER.REGISTER, { token: null, params });
  }

  loginUser(params: IUserCredentials): Promise<{ token: string } | null> {
    return postResourse(MAIN_API_URLS.USER.LOGIN, { token: null, params });
  }

  getUser(token: string): Promise<IUser> {
    return getResource(MAIN_API_URLS.USER.BASE, { token });
  }

  putToFavorites(token: string, product_id: string): Promise<IUser> {
    return putResourse(`${MAIN_API_URLS.USER.FAVORITES}/${product_id}`, { token });
  }

  deleteFromFavorites(token: string, product_id: string): Promise<IUser> {
    return deleteResourse(`${MAIN_API_URLS.USER.FAVORITES}/${product_id}`, { token });
  }

  putToCart(token: string, product_id: string): Promise<IUser> {
    return putResourse(`${MAIN_API_URLS.USER.CART}/${product_id}`, { token });
  }

  deleteFromCart(token: string, product_id: string): Promise<IUser> {
    return deleteResourse(`${MAIN_API_URLS.USER.CART}/${product_id}`, { token });
  }
}

export default new MainApiService();
