import favoritesService from '../../services/favorites.service';
import mainApiService from '../../services/main-api.service';
import storage from '../app/components/storage/storage';

class FavoritesPageComponent {
  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);

    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  async addToFavorites() {
    await favoritesService.addToFavorites('61a816ebabc3963158df20a9');
  }

  async removeFromFavorites({ target }: Event) {
    const productId = ((target as Element).closest('[data-id]') as HTMLElement).dataset.id;
    const { token } = storage.getUserState().credentials;
    const response = await mainApiService.deleteFromFavorites(token, productId);
    return response;
  }

  init() {
    this.#elements = {
      addButton: document.querySelector('.favorites__add-button'),
      favoritesList: document.querySelector('.favorites__list'),
    };

    this.#elements.addButton.addEventListener('click', this.addToFavorites);
    this.#elements.favoritesList.addEventListener('click', this.removeFromFavorites);
  }

  unmount() {
    this.#elements.addButton.removeEventListener('click', this.addToFavorites);
    this.#elements.favoritesList.removeEventListener('click', this.removeFromFavorites);
  }

  render() {
    return `
      <h2 class="favorites__page-title">Favorites products:</h2>
      <button class="favorites__add-button">Put to favorites</button>
      <ul style="color: white;" class="favorites__list">
        ${storage.getFavorites().map(item => `
        <li class="favorites__item" data-id="${item.id}">
          <p>${JSON.stringify(item)}</p>
          <button class="favorites__remove-button">Remove from favorites</button>
        </li>`).join('')}
      </ul>
    `;
  }
}

export default new FavoritesPageComponent();
