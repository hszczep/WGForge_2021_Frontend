import storage from '../components/app/components/storage/storage';
import headerComponent from '../components/header/header';
import popup from '../components/popup/popup';
import addToCartAnimation from './common/cart-animation';

import mainApiService from './main-api.service';

class CartService {
  constructor() {
    this.purchaseButtonClickHandler = this.purchaseButtonClickHandler.bind(this);
  }

  #getUserToken(): string {
    return storage.getUserState().credentials.token;
  }

  removeFromApiCart(productId: string) {
    return mainApiService.deleteFromCart(this.#getUserToken(), productId);
  }

  addToApiCart(productId: string) {
    return mainApiService.putToCart(this.#getUserToken(), productId);
  }

  addToCart(productId: string, purchaseButton: Element) {
    addToCartAnimation(purchaseButton.parentElement);
    purchaseButton.classList.remove('purchase-btn__active');
    this.removeFromApiCart(productId)
      .then(() => {
        storage.removeFromCart(productId);
        headerComponent.updateCartCount();
      })
      .catch((error) => {
        purchaseButton.classList.add('purchase-btn__active');
        popup.open(error.message);
      });
  }

  removeFromCart(productId: string, purchaseButton: Element) {
    purchaseButton.classList.add('purchase-btn__active');
    this.addToApiCart(productId)
      .then(() => {
        storage.addToCartById(productId);
        headerComponent.updateCartCount();
      })
      .catch((error) => {
        purchaseButton.classList.remove('purchase-btn__active');
        popup.open(error.message);
      });
  }

  purchaseButtonClickHandler({ target }: Event) {
    const purchaseButton = (target as Element).closest('.purchase-btn');
    if (!purchaseButton) return;

    if (!storage.checkIsUserLogged()) {
      window.location.hash = '#/signin';
      return;
    }

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;

    if (storage.checkProductInCartById(productId)) {
      this.addToCart(productId, purchaseButton);
    } else this.removeFromCart(productId, purchaseButton);
  }
}

export default new CartService();
