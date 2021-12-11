import storage from '../components/app/components/storage/storage';
import headerComponent from '../components/header/header';
import popup from '../components/popup/popup';

import mainApiService from './main-api.service';

import { EMPTY_MESSAGE_TEMPLATE } from '../components/cart/common/cart.constants';

class CartService {
  constructor() {
    // this.favoritesButtonClickHandler = this.favoritesButtonClickHandler.bind(this);
    this.removeFromCartButtonClickHandler = this.removeFromCartButtonClickHandler.bind(this);
  }

  #getUserToken(): string {
    return storage.getUserState().credentials.token;
  }

  #removeFromApiCart(productId: string) {
    return mainApiService.deleteFromCart(this.#getUserToken(), productId);
  }

  #addToApiCart(productId: string) {
    return mainApiService.putToCart(this.#getUserToken(), productId);
  }

  // favoritesButtonClickHandler({ target }: Event) {
  //   const likeButton = (target as Element).closest('.like-btn');
  //   if (!likeButton) return;

  //   if (!storage.checkIsUserLogged()) {
  //     window.location.hash = '#/signin';
  //     return;
  //   }

  //   const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
  //   const productId = currentProductListElement.dataset.id;

  //   const previousClassName = likeButton.className;

  //   if (storage.checkProductInFavoritesById(productId)) {
  //     likeButton.classList.remove('like-btn__active');
  //     this.#removeFromAPIFavorites(productId)
  //       .then(() => {
  //         storage.removeFromFavorites(productId);
  //         headerComponent.updateFavoritesCount();
  //       })
  //       .catch((error) => {
  //         likeButton.className = previousClassName;
  //         popup.open(error.message);
  //       });

  //     return;
  //   }

  //   likeButton.classList.add('like-btn__active');
  //   this.#addToAPIFavorites(productId)
  //     .then(() => {
  //       storage.addToFavoritesById(productId);
  //       headerComponent.updateFavoritesCount();
  //     })
  //     .catch((error) => {
  //       likeButton.className = previousClassName;
  //       popup.open(error.message);
  //     });
  // }

  removeFromCartButtonClickHandler({ target }: Event) {
    if (!(target as Element).closest('.cart__delete-button')) return;

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;

    if (!storage.checkProductInCartById(productId)) return;

    this.#removeFromApiCart(productId)
      .then(() => {
        storage.removeFromCart(productId);
        headerComponent.updateCartCount();
        if (!storage.getCart().length)
          currentProductListElement.parentElement.insertAdjacentHTML('afterbegin', EMPTY_MESSAGE_TEMPLATE);
        currentProductListElement.remove();
      })
      .catch((error) => popup.open(error.message));
  }
}

export default new CartService();
