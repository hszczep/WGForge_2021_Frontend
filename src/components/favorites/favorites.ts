import './scss/favorites.styles.scss';

import favoritesService from '../../services/favorites.service';
import storage from '../app/components/storage/storage';

import { renderFavoritesItem } from './common/fevorites.tools';
import { EMPTY_MESSAGE_TEMPLATE } from './common/favorites.constants';

class FavoritesPageComponent {
  #favoritesField: HTMLElement = null;

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
    this.#favoritesField = document.querySelector('.favorites-field');
    this.#favoritesField.addEventListener('click', this.removeFromFavoritesButtonClickHandler);
  }

  unmount(): void {
    this.#favoritesField.removeEventListener('click', this.removeFromFavoritesButtonClickHandler);
  }

  render(): string {
    const favoritesElements = storage
      .getFavorites()
      .map((favoritesItem) => renderFavoritesItem(favoritesItem))
      .join('');

    return `
      <fieldset class="favorites-field">
        <legend>Wishlist</legend>
        ${favoritesElements || EMPTY_MESSAGE_TEMPLATE}
      </fieldset>
    `;
  }
}

export default new FavoritesPageComponent();
