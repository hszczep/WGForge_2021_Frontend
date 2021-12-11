import './scss/cart.styles.scss';

import storage from '../app/components/storage/storage';
import headerComponent from '../header/header';
import popup from '../popup/popup';

import cartService from '../../services/cart.service';
import favoritesService from '../../services/favorites.service';

import { renderCartItem } from './common/cart.tools';
import { EMPTY_MESSAGE_TEMPLATE } from './common/cart.constants';

class CartPageComponent {
  #cartField: HTMLElement = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.removeFromCartButtonClickHandler = this.removeFromCartButtonClickHandler.bind(this);
  }

  removeFromCartButtonClickHandler({ target }: Event): void {
    if (!(target as Element).closest('.cart__delete-button')) return;

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;

    if (!storage.checkProductInCartById(productId)) return;

    cartService
      .removeFromApiCart(productId)
      .then(() => {
        storage.removeFromCart(productId);
        headerComponent.updateCartCount();
        if (!storage.getCart().length)
          currentProductListElement.parentElement.insertAdjacentHTML('afterbegin', EMPTY_MESSAGE_TEMPLATE);
        currentProductListElement.remove();
      })
      .catch((error) => popup.open(error.message));
  }

  init(): void {
    this.#cartField = document.querySelector('.cart-field');
    this.#cartField.addEventListener('click', this.removeFromCartButtonClickHandler);
    this.#cartField.addEventListener('click', favoritesService.favoritesButtonClickHandler);
  }

  unmount(): void {
    this.#cartField.removeEventListener('click', this.removeFromCartButtonClickHandler);
    this.#cartField.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
  }

  render(): string {
    const cartElements = storage
      .getCart()
      .map((cartItem) => renderCartItem(cartItem))
      .join('');

    return `
      <fieldset class="cart-field">
        <legend>Cart</legend>
        ${cartElements || EMPTY_MESSAGE_TEMPLATE}
      </fieldset>
    `;
  }
}

export default new CartPageComponent();
