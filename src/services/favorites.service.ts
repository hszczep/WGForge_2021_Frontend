import storage from '../components/app/components/storage/storage';
import headerComponent from '../components/header/header';
import popup from '../components/popup/popup';

import mainApiService from './main-api.service';

class FavoritesService {
  constructor() {
    this.favoritesButtonClickHandler = this.favoritesButtonClickHandler.bind(this);
  }

  #getUserToken(): string {
    return storage.getUserState().credentials.token;
  }

  addToAPIFavorites(productId: string) {
    return mainApiService.putToFavorites(this.#getUserToken(), productId);
  }

  removeFromAPIFavorites(productId: string) {
    return mainApiService.deleteFromFavorites(this.#getUserToken(), productId);
  }

  addToFavorites(productId: string, likeButton: Element) {
    likeButton.classList.remove('like-btn__active');
    this.removeFromAPIFavorites(productId)
      .then(() => {
        storage.removeFromFavorites(productId);
        headerComponent.updateFavoritesCount();
      })
      .catch((error) => {
        likeButton.classList.add('like-btn__active');
        popup.open(error.message);
      });
  }

  removeFromFavorites(productId: string, likeButton: Element) {
    likeButton.classList.add('like-btn__active');
    this.addToAPIFavorites(productId)
      .then(() => {
        storage.addToFavoritesById(productId);
        headerComponent.updateFavoritesCount();
      })
      .catch((error) => {
        likeButton.classList.remove('like-btn__active');
        popup.open(error.message);
      });
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

    if (storage.checkProductInFavoritesById(productId)) {
      this.addToFavorites(productId, likeButton);
    } else this.removeFromFavorites(productId, likeButton);
  }
}

export default new FavoritesService();
