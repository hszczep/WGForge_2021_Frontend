import './scss/cart.styles.scss';

import storage from '../app/components/storage/storage';
import headerComponent from '../header/header';
import popup from '../popup/popup';

import cartService from '../../services/cart.service';
import favoritesService from '../../services/favorites.service';

import { renderCartItem } from './common/cart.tools';
import { localizeCurrency } from '../../common/common.helper';
import { DEFAULT_CART_ORDER, EMPTY_MESSAGE_TEMPLATE, ORDER_CONFIRMED_POPUP_TITLE } from './common/cart.constants';

import { ICartOrder } from './model/cart-order.model';

class CartPageComponent {
  #cartOrder: ICartOrder = { ...DEFAULT_CART_ORDER };

  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.removeFromCartButtonClickHandler = this.removeFromCartButtonClickHandler.bind(this);
    this.cartOrderButtonHandler = this.cartOrderButtonHandler.bind(this);
  }

  #calculateCartSummary(): void {
    const cartProducts = storage.getCart();
    this.#cartOrder.currencyCode = cartProducts[0].price.code;

    cartProducts.forEach((cartItem) => {
      if (cartItem.discount > 0) {
        this.#cartOrder.totalCost += cartItem.price_discount;
        this.#cartOrder.totalDiscount += Number.parseFloat(cartItem.price.amount) - cartItem.price_discount;
      } else {
        this.#cartOrder.totalCost += Number.parseFloat(cartItem.price.amount);
      }
    });

    this.#cartOrder.totalDiscountPercent = Math.round(
      (this.#cartOrder.totalDiscount * 100) / (this.#cartOrder.totalCost + this.#cartOrder.totalDiscount)
    );
    this.#cartOrder.totalCount = cartProducts.length;
  }

  #getCartSummary(): string {
    const costString = localizeCurrency(this.#cartOrder.totalCost, this.#cartOrder.currencyCode);
    const discountString = localizeCurrency(this.#cartOrder.totalDiscount, this.#cartOrder.currencyCode);

    return `
      <span class="cart-summary-wrapper">
        <span class="summary-text">
          In order:&nbsp;<span class="order-items">${this.#cartOrder.totalCount}</span>&nbsp;item(s)
        </span>
        <span class="summary-text">
          Cost:&nbsp;<span class="order-price">${costString}</span>
        </span>
        <span class="summary-text summary-text-discount">
          Discount:&nbsp;<span class="order-discount">
            ${discountString}
          </span>&nbsp;(${this.#cartOrder.totalDiscountPercent}%)
        </span>
      </span>
    `;
  }

  #renderCartSummary(container: HTMLElement = this.#elements.cartSummary): void {
    const summaryContainer = container;
    summaryContainer.innerHTML = this.#getCartSummary();
  }

  #updateCartOrder(): void {
    this.#cartOrder = { ...DEFAULT_CART_ORDER };
    this.#elements.cartSummary.innerText = '';

    if (storage.getCart().length === 0) {
      this.#elements.cartOrder.classList.add('hidden');
      return;
    }

    this.#calculateCartSummary();
    this.#renderCartSummary();
    this.#elements.cartOrder.classList.remove('hidden');
  }

  cartOrderButtonHandler(): void {
    Promise.all(
      storage
        .getCart()
        .map((cartItem) => cartService.removeFromApiCart(cartItem.id).then(() => storage.removeFromCart(cartItem.id)))
    )
      .then(() => {
        window.location.hash = '#';
        headerComponent.updateCartCount();
        popup.open(this.#getCartSummary(), ORDER_CONFIRMED_POPUP_TITLE);
      })
      .catch((error) => popup.open(error.message));
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
        if (!storage.getCart().length) {
          currentProductListElement.parentElement.insertAdjacentHTML('afterbegin', EMPTY_MESSAGE_TEMPLATE);
        }
        this.#updateCartOrder();
        currentProductListElement.remove();
      })
      .catch((error) => popup.open(error.message));
  }

  init(): void {
    const cartField = document.querySelector('.cart-field') as HTMLElement;

    this.#elements = {
      cartField,
      cartOrder: cartField.querySelector('.cart-order'),
      cartSummary: cartField.querySelector('.cart-summary'),
      cartOrderButton: cartField.querySelector('.cart-order-button'),
    };

    this.#updateCartOrder();

    this.#elements.cartField.addEventListener('click', this.removeFromCartButtonClickHandler);
    this.#elements.cartField.addEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.#elements.cartOrderButton.addEventListener('click', this.cartOrderButtonHandler);
  }

  unmount(): void {
    this.#elements.cartField.removeEventListener('click', this.removeFromCartButtonClickHandler);
    this.#elements.cartField.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.#elements.cartOrderButton.removeEventListener('click', this.cartOrderButtonHandler);
  }

  render(): string {
    const cartElements = storage
      .getCart()
      .map((cartItem) => renderCartItem(cartItem))
      .join('');

    return `
      <fieldset class="cart-field">
        <legend>Cart</legend>
        <div class="cart-order">
          <p class="cart-summary"></p>
          <button class="cart-order-button">Purchase All</button>
        </div>
        ${cartElements || EMPTY_MESSAGE_TEMPLATE}
      </fieldset>
    `;
  }
}

export default new CartPageComponent();
