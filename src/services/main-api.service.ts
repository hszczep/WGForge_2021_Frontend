import { getResource, postResourse } from './common/services.helper';
import { MAIN_API_URLS } from './common/services.constants';
import { IUserCredentials } from '../models/user.model';

class MainApiService {
  getProducts() {
    return getResource(MAIN_API_URLS.PRODUCTS, { token: null });
  }

  registerUser(params: IUserCredentials) {
    return postResourse(MAIN_API_URLS.USER.REGISTER, { token: null, params });
  }

  loginUser(params: IUserCredentials) {
    return postResourse(MAIN_API_URLS.USER.LOGIN, { token: null, params });
  }

  getUser(token: string) {
    return getResource(MAIN_API_URLS.USER.BASE, { token });
  }
}

export default new MainApiService();