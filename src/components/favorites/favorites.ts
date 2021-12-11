import './scss/favorites.styles.scss';

import headerComponent from '../header/header';
import storage from '../app/components/storage/storage';
import popup from '../popup/popup';

import favoritesService from '../../services/favorites.service';

import { renderFavoritesItem } from './common/favorites.tools';
import { EMPTY_MESSAGE_TEMPLATE } from './common/favorites.constants';

class FavoritesPageComponent {
  #favoritesField: HTMLElement = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.removeFromFavoritesButtonClickHandler = this.removeFromFavoritesButtonClickHandler.bind(this);
  }

  removeFromFavoritesButtonClickHandler({ target }: Event) {
    if (!(target as Element).closest('.favorite__delete-button')) return;

    const currentFavoritesElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentFavoritesElement.dataset.id;

    if (!storage.checkProductInFavoritesById(productId)) return;

    favoritesService
      .removeFromAPIFavorites(productId)
      .then(() => {
        storage.removeFromFavorites(productId);
        headerComponent.updateFavoritesCount();
        if (!storage.getFavorites().length)
          currentFavoritesElement.parentElement.insertAdjacentHTML('afterbegin', EMPTY_MESSAGE_TEMPLATE);
        currentFavoritesElement.remove();
      })
      .catch((error) => popup.open(error.message));
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
