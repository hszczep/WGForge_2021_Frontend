import mainApiService from './main-api.service';
import localStorageService from './local-storage.service';

import { IUserCredentials } from '../models/user.model';

class AuthUserService {
  async #signUpUser(userCredentials: IUserCredentials) {
    const created = await mainApiService.registerUser(userCredentials);
    if (created) {
      return this.#singInUser(userCredentials);
    }
    return false;
  }

  async #singInUser(userCredentials: IUserCredentials) {
    const { token } = await mainApiService.loginUser(userCredentials);

    if (token) {
      localStorageService.setUserInfo(userCredentials.email, token);
      return mainApiService.getUser(token);
    }

    return false;
  }

  #checkUserStatus() {
    return localStorageService.getUserInfo();
  }

  logOutUser() {
    localStorageService.deleteUserInfo();
  }

  async loginUser(isRegistration: boolean, userCredentials: IUserCredentials) {
    if (isRegistration) {
      return this.#signUpUser(userCredentials);
    }
    return this.#singInUser(userCredentials);
  }
}

export default new AuthUserService();
