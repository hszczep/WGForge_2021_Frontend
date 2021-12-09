import './scss/product-page.styles.scss';

import storage from '../app/components/storage/storage';
import convertToRomane from '../../common/common.helper';
import favoritesService from '../../services/favorites.service';

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
    };
    this.#elements.favoritesButton.addEventListener('click', favoritesService.favoritesButtonClickHandler);
  }

  unmount() {
    this.#elements.favoritesButton.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
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

    return `
          <div class="card__single" data-id="${product.id}">
              <img class="card-img" src="${product.images[0]}" alt="${product.name}" />
              <div class="card-specifications">
                <p class="discount">${product.discount || ''}</p>
                <h2 class="item-text">
                  ${productNameInfo}
                </h2>
                <p class="price">$ ${product.price}</p>
                <p class="price price-discount">${product.discount ? product.price : ''}</p>
              </div>
            <button class="like-btn ${storage.checkProductInFavoritesById(product.id) ? 'like-btn__active' : ''}">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </div>
    `;
  }
}

export default new ProductPageComponent();
