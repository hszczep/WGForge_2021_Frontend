import storage from '../components/app/components/storage/storage';
import mainApiService from './main-api.service';

class AdminService {
  #getUserToken(): string {
    return storage.getUserState().credentials.token;
  }

  changeCurrency(currencyCode: string) {
    return mainApiService.changeCurrency(this.#getUserToken(), { currencyCode });
  }

  changeProductOrder(order: number, product_id: string) {
    return mainApiService.changeProductOrder(this.#getUserToken(), product_id, { order });
  }

  addNewProduct(newProduct: unknown) {
    return mainApiService.addNewProduct(this.#getUserToken(), newProduct);
  }
}

export default new AdminService();
