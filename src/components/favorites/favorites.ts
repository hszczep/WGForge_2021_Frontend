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
    const { token } = storage.getUserState().credentials;
    const response = await mainApiService.putToFavorites(token, '61a816ebabc3963158df209b');
    return response;
  }

  async removeFromFavorites() {
    const { token } = storage.getUserState().credentials;
    const response = await mainApiService.deleteFromFavorites(token, '61a816ebabc3963158df209b');
    return response;
  }

  init() {
    this.#elements = {
      addButton: document.querySelector('.favorites__add-button'),
      removeButton: document.querySelector('.favorites__remove-button'),
    };

    this.#elements.addButton.addEventListener('click', this.addToFavorites);
    this.#elements.removeButton.addEventListener('click', this.removeFromFavorites);
  }

  unmount() {
    this.#elements.addButton.removeEventListener('click', this.addToFavorites);
    this.#elements.removeButton.removeEventListener('click', this.removeFromFavorites);
  }

  render() {
    return `
      <h2 class="favorites__page-title">Favorites products:</h2>
      <button class="favorites__add-button">Put to favorites</button>
      <div style="color: white;">${JSON.stringify(storage.getUserState().favorites)}</div>
      <button class="favorites__remove-button">Remove from favorites</button>
    `;
    //   <ul class="favorites__list">
    //     <li class="favorites__item"></li>
    //   </ul>
    // `;
  }
}

export default new FavoritesPageComponent();
