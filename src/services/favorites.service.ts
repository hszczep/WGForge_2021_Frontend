import storage from '../components/app/components/storage/storage';
import { EMPTY_MESSAGE } from '../components/favorites/common/favorites.constants';
import headerComponent from '../components/header/header';
import mainApiService from './main-api.service';

class FavoritesService {
  constructor() {
    this.favoritesButtonClickHandler = this.favoritesButtonClickHandler.bind(this);
    this.removeFromFavoritesButtonClickHandler = this.removeFromFavoritesButtonClickHandler.bind(this);
  }

  #getUserToken(): string {
    return storage.getUserState().credentials.token;
  }

  #removeFromAPIFavorites(productId: string) {
    return mainApiService.deleteFromFavorites(this.#getUserToken(), productId);
  }

  #addToAPIFavorites(productId: string) {
    return mainApiService.putToFavorites(this.#getUserToken(), productId);
  }

  favoritesButtonClickHandler({ target }: Event) {
    const likeButton = (target as Element).closest('.like-btn');
    if (!likeButton) return;

    if (!storage.checkIsUserLogged()) {
      window.location.hash = '#/signin';
      return;
    }

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;

    const previousClassName = likeButton.className;

    if (storage.checkProductInFavoritesById(productId)) {
      likeButton.classList.remove('like-btn__active');
      this.#removeFromAPIFavorites(productId)
        .then(() => {
          storage.removeFromFavorites(productId);
          headerComponent.updateFavoritesCount();
        })
        .catch((error) => {
          likeButton.className = previousClassName;
          console.log(error);
        });

      return;
    }

    likeButton.classList.add('like-btn__active');
    this.#addToAPIFavorites(productId)
      .then(() => {
        storage.addToFavoritesById(productId);
        headerComponent.updateFavoritesCount();
      })
      .catch((error) => {
        likeButton.className = previousClassName;
        console.log(error);
      });
  }

  removeFromFavoritesButtonClickHandler({ target }: Event) {
    if (!(target as Element).closest('.favorites__remove-button')) return;

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;

    if (!storage.checkProductInFavoritesById(productId)) return;

    this.#removeFromAPIFavorites(productId)
      .then(() => {
        storage.removeFromFavorites(productId);
        headerComponent.updateFavoritesCount();
        if (!storage.getFavorites().length) currentProductListElement.parentElement.textContent = EMPTY_MESSAGE;
        currentProductListElement.remove();
      })
      .catch(console.log);
  }
}

export default new FavoritesService();
