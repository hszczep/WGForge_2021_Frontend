import './scss/cart.styles.scss';

import storage from '../app/components/storage/storage';

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

  removeFromCartButtonClickHandler(event: Event) {
    cartService.removeFromCartButtonClickHandler(event);
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
