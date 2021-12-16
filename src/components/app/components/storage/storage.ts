import { USER } from '../../../../common/common.constants';
import ProductItemInterface from '../../../../models/product-item.model';
import { IUserState } from '../../../../models/user.model';
import mainApiService from '../../../../services/main-api.service';

class Storage {
  #userState: IUserState = USER.DEFAULT_STATE;
  products: Array<ProductItemInterface>;
  productsFilter: { nation: string; type: string; tier: string };
  category: string;
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

  setProducts(products: Array<ProductItemInterface>) {
    this.products = products;
  }

  getProducts(): Array<ProductItemInterface> {
    return this.products;
  }

  getProductById(productId: string) {
    return this.products.find((product) => product.id === productId);
  }

  getFavorites(): Array<ProductItemInterface> {
    return this.#userState.favorites;
  }

  checkProductInFavoritesById(productId: string): boolean {
    return Boolean(this.#userState.favorites.find((favoriteItem) => favoriteItem.id === productId));
  }

  addToFavorites(productItem: ProductItemInterface) {
    this.#userState.favorites.push(productItem);
  }

  addToFavoritesById(productId: string) {
    const currentProduct = this.getProductById(productId);
    this.addToFavorites(currentProduct);
  }

  removeFromFavorites(productId: string) {
    this.#userState.favorites = this.#userState.favorites.filter((favoriteItem) => favoriteItem.id !== productId);
  }

  getCart(): Array<ProductItemInterface> {
    return this.#userState.cart;
  }

  checkProductInCartById(productId: string): boolean {
    return Boolean(this.#userState.cart.find((cartItem) => cartItem.id === productId));
  }

  addToCart(productItem: ProductItemInterface) {
    this.#userState.cart.push(productItem);
  }

  addToCartById(productId: string) {
    const currentProduct = this.getProductById(productId);
    this.addToCart(currentProduct);
  }

  removeFromCart(productId: string) {
    this.#userState.cart = this.#userState.cart.filter((cartItem) => cartItem.id !== productId);
  }

  async init() {
    this.products = await mainApiService.getProducts();
    this.productsFilter = {
      nation: '',
      type: '',
      tier: '',
    };
    this.category = 'all';
  }
}

export default new Storage();
