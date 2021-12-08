import { USER } from '../../../../common/common.constants';
import { IUserState } from '../../../../models/user.model';
import ProductItemInterface from './product-item-interface';
import mainApiService from '../../../../services/main-api.service';
class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;
  products: Array<ProductItemInterface>;
  setUserState(userState: IUserState) {
    this.#userState = userState;
  }

  getUserState(): IUserState {
    return this.#userState;
  }

  setLoggedUserState(isLogged: boolean): void {
    this.#userState.isLogged = isLogged;
  }

  checkIsUserLogged(): boolean {
    return this.#userState.isLogged;
  }

  checkIsUserAdmin(): boolean {
    return this.#userState.isAdmin;
  }

  resetUserState() {
    this.#userState = USER.DEFAULT_STATE;
  }

  async init() {
    this.products =  await mainApiService.getProducts();
  }
}

export default new Storage();
