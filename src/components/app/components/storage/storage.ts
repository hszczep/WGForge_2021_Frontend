import { USER } from '../../../../common/common.constants';
import { IProductItem } from '../../../../models/product-item.model';
import { IUserState } from '../../../../models/user.model';

class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;
  #products: IProductItem[] = [];

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

  setProducts(products: IProductItem[]) {
    this.#products = products;
  }

  getProducts(): IProductItem[] {
    return this.#products;
  }

  getProductById(productId: string) {
    return this.#products.find((product) => product.id === productId);
  }

  getFavorites(): IProductItem[] {
    return this.#userState.favorites;
  }

  addToFavorites(productItem: IProductItem) {
    this.#userState.favorites.push(productItem);
  }

  removeFromFavorites(product_id: string) {
    this.#userState.favorites = this.#userState.favorites.filter((favoriteItem) => favoriteItem.id !== product_id);
  }

  init() {}
}

export default new Storage();
