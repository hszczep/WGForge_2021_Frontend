import { USER } from '../../../../common/common.constants';
import { IProductItem } from '../../../../models/product-item.model';
import { IUserState } from '../../../../models/user.model';

class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;

  setUserState(userState: IUserState) {
    this.#userState = userState;
  }

  getUserState(): IUserState {
    return this.#userState;
  }

  getFavorites(): IProductItem[] {
    return this.#userState.favorites;
  }

  addToFavorites(productItem: IProductItem) {
    this.getFavorites().push(productItem);
  }

  removeFromFavorites(product_id: string) {
    this.#userState.favorites = this.#userState.favorites.filter((favoriteItem) => favoriteItem.id !== product_id);
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

  init() {}
}

export default new Storage();
