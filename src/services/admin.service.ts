import storage from '../components/app/components/storage/storage';
import mainApiService from './main-api.service';
import { ProductModel } from './models/productModel';

class AdminService {
  static #getAdminToken() {
    return storage.getUserState().credentials.token;
  }

  async updateProduct(id: string, product:ProductModel) {
    return mainApiService.updateProduct(AdminService.#getAdminToken(), id, product);
  }
  async createProduct(product: ProductModel){
    return mainApiService.createProduct(AdminService.#getAdminToken(), product)
  }
  async changeCurrency(currencyCode: string) {
    return mainApiService.changeCurrency(AdminService.#getAdminToken(), { currencyCode });
  }
  async deleteProduct(id: string) {
    return mainApiService.deleteProduct(AdminService.#getAdminToken(), id)
  }
}

export default new AdminService();