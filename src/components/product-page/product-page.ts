import './scss/product-page.styles.scss';

import storage from '../app/components/storage/storage';
import { convertToRomane } from '../../common/common.helper';
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
    let productTextInfo;

    if (product.type === productTank) {
      productTextInfo = `
                  <span class="flag flag__${product.nation}"></span>
                  <span class="tank-type tank-type__${product.tank_type}"></span>
                  <span class="level">${convertToRomane(product.tier)}</span>
                  <span class="item-name">${product.name}</span>
      `;
    }

    return `
      <div class='content-menu'>
        <a href='#' class='WoT_logo'><img src='assets/images/WoT_logo.png' alt='WoT logo' /></a>
        <div class='content-menu__buttons'>
          <button>All</button>
          <button>Vehicles</button>
          <button>Gold</button>
          <button>Premium account</button>
        </div>
      </div>

      <article class="item-block" data-id="${product.id}">
        <div class="item-block__main-info">
          <p class="discount">${product.discount ? `- ${product.discount}%` : ''}</p>
          <div class="item-specifications">
            <h2 class="item-title">${product.name}</h2>
            <h2 class="item-text">${productTextInfo}</h2>           
            <div class="price-block">
                <p class="price${product.discount ? ' old-price' : ''}">${`$ ${product.price.amount}`}</p>
                <p class="price price-discount">${product.discount ? `${`$ ${product.price_discount}`}` : ''}</p>
            </div>
            <div class="item__controls">
              <button class="purchase-btn">purchase</button>
              <button class="like-btn ${product.isFavorite ? 'like-btn__active' : ''}">
                <svg class="like-btn__icon">
                  <use xlink:href="assets/images/sprite.svg#like"></use>
                </svg>
              </button>
            </div>
          </div>
          <img class="item-img" src="${product.images[0]}" alt="${product.name}" />
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
