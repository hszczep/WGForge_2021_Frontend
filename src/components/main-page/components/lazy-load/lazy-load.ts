import storage from '../../../app/components/storage/storage';
import ProductItemComponent from '../../../product-item/product-item';
import { PRODUCT_LIMIT, PRODUCT_OFFSET } from '../../common/constants';
import ProductItemInterface from '../../../../models/product-item.model';

class LazyLoad {
  listOfProducts: ProductItemInterface[];
  offset: number;
  limit: number;
  listSize: number;
  observer: IntersectionObserver;
  filterForProducts: { nation: string; type: string; tier: string };
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.offset = PRODUCT_OFFSET;
    this.limit = PRODUCT_LIMIT;
  }
  init(listOfProducts: Array<ProductItemInterface>) {
    this.listOfProducts = listOfProducts;
    this.listSize = this.listOfProducts.length;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && this.addProductsToList());
    });
    this.observer.observe(document.getElementById('list-end'));
    this.addProductsToList();
  }

  addProductsToList() {
    const container = document.getElementById('cards-container');
    const productsToRender = this.listOfProducts
      .slice(this.offset, Math.min(this.offset + this.limit, this.listSize))
      .map((product) => {
        const item = product;
        item.isFavorite = storage.checkProductInFavoritesById(product.id);
        return new ProductItemComponent(product).render();
      })
      .join('');
    this.offset = Math.min(this.offset + this.limit, this.listSize);
    if (this.offset === this.listSize) {
      this.observer.disconnect();
    }
    container.insertAdjacentHTML('beforeend', productsToRender);
  }

  unmount() {
    this.observer.disconnect();
    this.offset = 0;
  }
}

export default new LazyLoad();
