import './scss/favorites.styles.scss';

import favoritesService from '../../services/favorites.service';
import storage from '../app/components/storage/storage';
// import ProductItemComponent from '../product-item/product-item';

import { EMPTY_MESSAGE } from './common/favorites.constants';
import { IProductItem } from '../../models/product-item.model';

class FavoritesPageComponent {
  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.removeFromFavoritesButtonClickHandler = this.removeFromFavoritesButtonClickHandler.bind(this);
  }

  removeFromFavoritesButtonClickHandler(event: Event) {
    favoritesService.removeFromFavoritesButtonClickHandler(event);
  }

  init(): void {
    this.#elements = {
      addButton: document.querySelector('.favorites__add-button'),
      favoritesList: document.querySelector('.favorites__list'),
    };

    this.#elements.favoritesList.addEventListener('click', this.removeFromFavoritesButtonClickHandler);
  }

  unmount(): void {
    this.#elements.favoritesList.removeEventListener('click', this.removeFromFavoritesButtonClickHandler);
  }

  #renderFavoritesItem(favoritesItem: IProductItem): string {
    return `
      <article class="favorite-item" data-id="${favoritesItem.id}>
        <div class="discount">${favoritesItem.discount}(-10%)</div>

        <svg class="favorite__delete-button">
          <use xlink:href="assets/images/sprite.svg#close"></use>
        </svg>
        <div class="favorite-item__info">
          <div class="favorite-item__img-block">
            <img
        <div class="discount">${favoritesItem.discount}(-10%)</div>
              src="${favoritesItem.images[0]}"
              alt="${favoritesItem.name}"
              class="favorite-item__img"
            />
          </div>
          <div class="favorite-item__text-block">
            <h2 class="favorite-item__text">
              <span class="flag flag__usa">${favoritesItem.nation}</span>
              <span class="tank-type tank-type__heavytank">${favoritesItem.tank_type}</span>
              <span class="level">${favoritesItem.tier}(XIII)</span>
              <span class="item-name">${favoritesItem.name}(Vickers Medium Mk. II)</span>
            </h2>

            <div class="favorite-item__description">${favoritesItem.details}</div>
          </div>
          <div class="favorite-item__price-block">
            <p class="price old-price">$ ${favoritesItem.price}</p>
            <p class="price price-discount">$ ${favoritesItem.price_discount}</p>
            <button class="purchase-btn">purchase</button>
          </div>
        </div>
      </article>`;
  }

  render(): string {
    const favoritesElements = storage
      .getFavorites()
      .map(
        (favoritesItem) => this.#renderFavoritesItem(favoritesItem)
        // <li class="favorites__item" data-id="${favoritesItem.id}">
        //   ${new ProductItemComponent(favoritesItem).render()}
        //   <button class="favorites__remove-button">Remove from favorites</button>
        // </li>
      )
      .join('');

    return `
      <fieldset class="favorites-field">
        <legend>Wishlist</legend>
        ${favoritesElements || EMPTY_MESSAGE}
      </fieldset>
    `;
  }
  //   render() {
  //     return `
  // <fieldset class="favorites-field">
  //   <legend>Wishlist</legend>
  //
  //   <article class="favorite-item">
  //     <svg class="delete-button">
  //       <use xlink:href="assets/images/sprite.svg#close"></use>
  //     </svg>

  //     <div class="favorite-item__info">
  //       <div class="favorite-item__img-block">
  //         <img
  //           src="http://api-console.worldoftanks.com/static/2.70/wotx/encyclopedia/tanks/big_france_f03_d2.png"
  //           alt="name"
  //           class="favorite-item__img"
  //         />
  //       </div>
  //       <div class="favorite-item__text-block">
  //         <h2 class="favorite-item__text">
  //           <span class="flag flag__usa"></span>
  //           <span class="tank-type tank-type__heavytank"></span>
  //           <span class="level">XIII</span>
  //           <span class="item-name">Vickers Medium Mk. II</span>
  //         </h2>

  //         <div class="favorite-item__description">
  //           The legend of the Soviet armored...
  //         </div>
  //       </div>
  //       <div class="favorite-item__price-block">
  //         <p class="price">$ 100.92</p>
  //         <p class="price price-discount"></p>
  //         <button class="purchase-btn">purchase</button>
  //       </div>
  //     </div>
  //   </article>
  // </fieldset>
  //       `;
  //   }
}

export default new FavoritesPageComponent();
