import storage from '../components/app/components/storage/storage';
import mainApiService from './main-api.service';

class FavoritesService {
  constructor() {
    this.favoritesButtonClickHandler = this.favoritesButtonClickHandler.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
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

  async addToFavorites({ target }: Event) {
    if (!storage.checkIsUserLogged()) {
      window.location.hash = '#/signin';
      return;
    }

    const currentProductListElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentProductListElement.dataset.id;
    try {
      await this.#addToAPIFavorites(productId);
      const currentProduct = storage.getProductById(productId);
      storage.addToFavorites(currentProduct);
      const likeButton = (target as Element).closest('.like-btn');
      if (likeButton) likeButton.classList.toggle('like-btn__active');
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromFavorites({ target }: Event) {
    const currentFavoritesElement = (target as Element).closest('[data-id]') as HTMLElement;
    const productId = currentFavoritesElement.dataset.id;

    try {
      await this.#removeFromAPIFavorites(productId);
      storage.removeFromFavorites(productId);
      const likeButton = (target as Element).closest('.like-btn');
      if (likeButton) {
        likeButton.classList.toggle('like-btn__active');
      } else currentFavoritesElement.remove();
    } catch (error) {
      console.log(error);
    }
  }

  favoritesButtonClickHandler(event: Event) {
    const likeButton = (event.target as Element).closest('.like-btn');
    if (!likeButton) return;

    if (!storage.checkIsUserLogged()) {
      window.location.hash = '#/signin';
      return;
    }

    if (likeButton.classList.contains('like-btn__active')) {
      this.removeFromFavorites(event);
    } else this.addToFavorites(event);
  }
}

export default new FavoritesService();
