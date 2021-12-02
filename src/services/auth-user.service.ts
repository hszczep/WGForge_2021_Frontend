import mainApiService from './main-api.service';
import localStorageService from './local-storage.service';

import { IUser, IUserCredentials } from '../models/user.model';
import storage from '../components/app/components/storage/storage';
import { USER } from '../common/common.constants';
import { getUserNameFromEmail } from '../common/common.helper';

class AuthUserService {
  async #signUpUser(userCredentials: IUserCredentials) {
    const created = await mainApiService.registerUser(userCredentials);
    if (created) {
      return this.#singInUser(userCredentials);
    }
    return false;
  }

  async #singInUser(userCredentials: IUserCredentials): Promise<IUser | false> {
    const { token } = (await mainApiService.loginUser(userCredentials)) || { token: null };

    // if (token) {
    //   localStorageService.setUserInfo(userCredentials.email, token);

    //   const user = await mainApiService.getUser(token);
    //   if (!user) return false;

    //   storage.setUserState({
    //     credentials: userCredentials,
    //     isLogged: true,
    //     isAdmin: user.role === USER.ROLES.ADMIN
    //   });

    //   return user;
    // }

    if (!token) return false;

    return this.#updateUser(token, userCredentials);
  }

  async #updateUser(token: string, userCredentials?: IUserCredentials): Promise<IUser | false> {
    const user = await mainApiService.getUser(token);
    if (!user && !userCredentials) return false;

    const email = userCredentials?.email || user.email;
    localStorageService.setUserInfo(email, token);

    storage.setUserState({
      credentials: userCredentials || {
        name: getUserNameFromEmail(email),
        email,
        token,
      },
      isLogged: true,
      isAdmin: user.role === USER.ROLES.ADMIN,
    });

    console.log(storage.getUserState());
    // debugger;

    return user;
  }

  updateUserState() {
    const { token } = localStorageService.getUserInfo() || { token: null };

    if (!token) return;

    this.#updateUser(token);
  }

  logOutUser() {
    storage.resetUserState();
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
