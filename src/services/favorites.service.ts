import storage from '../components/app/components/storage/storage';
import mainApiService from './main-api.service';

class FavoritesService {
  async addToFavorites(productId: string) {
    const currentProduct = storage.getProductById(productId);

    const { token } = storage.getUserState().credentials;
    await mainApiService
      .putToFavorites(token, productId)
      .then(() => storage.addToFavorites(currentProduct))
      .catch(console.log);
  }

  async removeFromFavorites(productId: string) {
    const { token } = storage.getUserState().credentials;
    await mainApiService
      .deleteFromFavorites(token, productId)
      .then(() => storage.removeFromFavorites(productId))
      .catch(console.log);
  }
}

export default new FavoritesService();
