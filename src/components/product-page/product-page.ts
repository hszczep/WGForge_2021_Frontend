import './scss/product-page.styles.scss';

import storage from '../app/components/storage/storage';
import Swiper from './components/swiper/swiper';

import favoritesService from '../../services/favorites.service';
import cartService from '../../services/cart.service';
import menu from '../main-page/components/categories/categories';

import { convertToRomane, formatDiscount, localizeCurrency } from '../../common/common.helper';
import { PRODUCT_TYPE_VEHICLE } from '../../common/common.constants';

class ProductPageComponent {
  #elements: { [key: string]: HTMLElement } = null;
  #swiper: Swiper;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    this.#elements = {
      favoritesButton: document.querySelector('.like-btn'),
      purchaseButton: document.querySelector('.purchase-btn'),
    };
    this.#elements.favoritesButton.addEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.#elements.purchaseButton.addEventListener('click', cartService.purchaseButtonClickHandler);
    menu.init();
    this.#swiper.init();
  }

  unmount() {
    this.#elements.favoritesButton.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.#elements.purchaseButton.removeEventListener('click', cartService.purchaseButtonClickHandler);

    this.#swiper.unmount();
  }

  render() {
    this.#swiper = new Swiper();

    const productId = window.location.hash.split('/').pop();
    const product = storage.getProductById(productId);
    let productTextInfo;
    if (product.type.includes(PRODUCT_TYPE_VEHICLE)) {
      productTextInfo = `
                  <span class="flag flag__${product.nation}"></span>
                  <span class="tank-type tank-type__${product.tank_type.toLowerCase()}"></span>
                  <span class="level">${convertToRomane(product.tier)}</span>
                  <span class="item-name">${product.name}</span>
      `;
    }
    const {price, price_discount,discount_show_type, discount } = product
    const discountFormatted = formatDiscount(discount, price_discount, discount_show_type, price);
    const priceLocalized = localizeCurrency(Number(price.amount), price.code);
    const priceDiscountLocalized = price_discount
      ? localizeCurrency(Number(price_discount), price.code)
      : '';
    const isFavorite = storage.checkProductInFavoritesById(product.id);
    const isInCart = storage.checkProductInCartById(product.id);
    return `
      <div class='content-menu'>
        <a href='#' class='WoT_logo'><img src='assets/images/WoT_logo.png' alt='WoT logo' /></a>
        <div class='content-menu__buttons'>
          ${menu.render()}
        </div>
      </div>
      <article class="item-block" data-id="${product.id}">
        <div class="item-block__main-info">
          <p class="discount">${discountFormatted}</p>
          <div class="item-specifications">
            <h2 class="item-title">${product.name}</h2>
            <h2 class="item-text">${productTextInfo}</h2>           
            <div class="price-block">
                <p class="price${discount ? ' old-price' : ''}">${priceLocalized}</p>
                <p class="price price-discount">${priceDiscountLocalized}</p>
            </div>
            <div class="item__controls">
              <button class="purchase-btn ${isInCart ? 'purchase-btn__active' : ''}">purchase</button>
              <button class="like-btn ${isFavorite ? 'like-btn__active' : ''}">
                <svg class="like-btn__icon">
                  <use xlink:href="assets/images/sprite.svg#like"></use>
                </svg>
              </button>
            </div>
          </div>
          ${this.#swiper.render(product)}
        </div>
        <div class="item-description">
          <h3 class="item-description__title">Details</h3>
          <p class="item-description__text">${product.details}</p>
        </div>
      </article>
    `;
  }
}

export default new ProductPageComponent();
