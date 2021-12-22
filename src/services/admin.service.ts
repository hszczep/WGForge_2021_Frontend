import storage from '../components/app/components/storage/storage';
import mainApiService from './main-api.service';
import { ProductModel } from './models/productModel';

class AdminService {
  static #getAdminToken() {
    return storage.getUserState().credentials.token;
  }

  updateProduct(id: string, product: ProductModel) {
    return mainApiService.updateProduct(AdminService.#getAdminToken(), id, product);
  }
  createProduct(product: ProductModel) {
    return mainApiService.createProduct(AdminService.#getAdminToken(), product);
  }
  changeCurrency(currencyCode: string) {
    return mainApiService.changeCurrency(AdminService.#getAdminToken(), { currencyCode });
  }
  async deleteProduct(id: string) {
    return mainApiService.deleteProduct(AdminService.#getAdminToken(), id)
  }
}

export default new AdminService();
