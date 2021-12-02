import { USER } from '../../../../common/common.constants';
import { IUserState } from '../../../../models/user.model';

class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;

  setUserState(userState: IUserState) {
    this.#userState = userState;
  }

  getUserState(): IUserState {
    return this.#userState;
  }

  setLoggedUserState(isLogged: boolean): void {
    this.#userState.isLogged = isLogged;
  }

  isUserLogged(): boolean {
    return this.#userState.isLogged;
  }

  isUserAdmin(): boolean {
    return this.#userState.isAdmin;
  }

  resetUserState() {
    this.#userState = USER.DEFAULT_STATE;
  }

  init() {}
}

export default new Storage();
