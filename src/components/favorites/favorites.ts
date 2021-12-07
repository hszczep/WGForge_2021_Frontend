import mainApiService from '../../services/main-api.service';
import storage from '../app/components/storage/storage';

class FavoritesPageComponent {
  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.favoritesButtonClickHandler = this.favoritesButtonClickHandler.bind(this);
  }

  async favoritesButtonClickHandler() {
    const { token } = storage.getUserState().credentials;
    const response = await mainApiService.putToFavorites(token, '61a816ebabc3963158df209d');
    return response;
  }

  init() {
    this.#elements = {
      addButton: document.querySelector('.favorites__add-button'),
    };

    this.#elements.addButton.addEventListener('click', this.favoritesButtonClickHandler);
  }

  unmount() {
    this.#elements.addButton.removeEventListener('click', this.favoritesButtonClickHandler);
  }

  render() {
    return `
      <h2 class="favorites__page-title">Favorites products:</h2>
      <button class="favorites__add-button">Put to favorites</button>
      <ul class="favorites__list">
        <li class="favorites__item"></li>
      </ul>
    `;
  }
}

export default new FavoritesPageComponent();
