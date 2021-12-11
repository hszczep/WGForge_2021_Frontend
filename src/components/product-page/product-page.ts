import './scss/product-page.styles.scss';

import storage from '../app/components/storage/storage';
import { convertToRomane, localizeCurrency } from '../../common/common.helper';
import favoritesService from '../../services/favorites.service';
import cartService from '../../services/cart.service';

class ProductPageComponent {
  #elements: { [key: string]: HTMLElement } = null;

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
  }

  unmount() {
    this.#elements.favoritesButton.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.#elements.purchaseButton.removeEventListener('click', cartService.purchaseButtonClickHandler);
  }

  render() {
    const productId = window.location.hash.split('/').pop();
    const product = storage.getProductById(productId);
    const productTank = 'machinery';
    let productNameInfo;

    if (product.type === productTank) {
      productNameInfo = `
                  <span class="flag flag__${product.nation}"></span>
                  <span class="tank-type tank-type__${product.tank_type}"></span>
                  <span class="level">${convertToRomane(product.tier)}</span>
                  <span class="item-name">${product.name}</span>
      `;
    } else {
      productNameInfo = `
                  <span class="item-name">${product.name}</span>
      `;
    }

    const price = localizeCurrency(Number(product.price.amount), product.price.code);
    const priceDiscount = product.price_discount
      ? localizeCurrency(Number(product.price_discount), product.price.code)
      : '';
    const isInCart = storage.checkProductInCartById(product.id);

    return `
          <div class="card__single" data-id="${product.id}">
              <img class="card-img" src="${product.images[0]}" alt="${product.name}" />
              <div class="card-specifications">
                <p class="discount">${priceDiscount}</p>
                <h2 class="item-text">
                  ${productNameInfo}
                </h2>
                <p class="price">${price}</p>
                <p class="price price-discount">${product.discount ? product.discount : ''}</p>
              </div>
            <button class="like-btn ${storage.checkProductInFavoritesById(product.id) ? 'like-btn__active' : ''}">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn ${isInCart ? 'purchase-btn__active' : ''}">purchase</button>
          </div>
    `;
  }
}

export default new ProductPageComponent();
