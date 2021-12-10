import './scss/favorites.styles.scss';

import favoritesService from '../../services/favorites.service';
import storage from '../app/components/storage/storage';
import ProductItemComponent from '../product-item/product-item';

import { EMPTY_MESSAGE } from './common/favorites.constants';

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

  render(): string {
    const favoritesElements = storage
      .getFavorites()
      .map(
        (favoritesItem) => `
          <li class="favorites__item" data-id="${favoritesItem.id}">
            ${new ProductItemComponent(favoritesItem).render()}
            <button class="favorites__remove-button">Remove from favorites</button>
          </li>`
      )
      .join('');

    return `
      <h2 class="favorites__page-title">Favorites products:</h2>
      <ul style="color: white;" class="favorites__list">
        ${favoritesElements || EMPTY_MESSAGE}
      </ul>
    `;
  }
}

export default new FavoritesPageComponent();
