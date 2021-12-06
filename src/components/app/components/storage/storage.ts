<<<<<<< HEAD
import ProductIteIinterface from './product-item-interface';

class Storage {
  mainData: Array<ProductIteIinterface>;
  constructor() {
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
=======
import { USER } from '../../../../common/common.constants';
import { IUserState } from '../../../../models/user.model';

class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;

  setUserState(userState: IUserState) {
    this.#userState = userState;
>>>>>>> master
  }

  getUserState(): IUserState {
    return this.#userState;
  }

<<<<<<< HEAD
  async init() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    this.mainData = await fetch('https://wg-forge-back.herokuapp.com/api/products').then((res) => res.json());
=======
  setLoggedUserState(isLogged: boolean): void {
    this.#userState.isLogged = isLogged;
>>>>>>> master
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

  init() {}
}

export default new Storage();
