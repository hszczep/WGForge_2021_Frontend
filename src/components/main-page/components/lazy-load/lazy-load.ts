import storage from '../../../app/components/storage/storage';
import ProductItemComponent from '../../../product-item/product-item';
import { PRODUCT_LIMIT, PRODUCT_OFFSET } from '../../common/constants';
import favoritesService from '../../../../services/favorites.service';
import ProductItemInterface from '../../../../models/product-item.model';

class LazyLoad {
  listOfProducts: ProductItemInterface[];
  offset: number;
  limit: number;
  listSize: number;
  observer: IntersectionObserver;
  filterForProducts: { nation: string; type: string; tier: string };
  #elements: { [key: string]: HTMLElement } = null;
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.offset = PRODUCT_OFFSET;
    this.limit = PRODUCT_LIMIT;
  }
  init() {
    this.listOfProducts = storage.products;
    this.filterForProducts = storage.productsFilter;
    this.listSize = this.listOfProducts.length;
    this.#elements = {
      productsList: document.querySelector('.cards-field'),
    };
    this.#elements.productsList.addEventListener('click', favoritesService.favoritesButtonClickHandler);

    this.addProductsToList();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && this.addProductsToList());
    });
    this.observer.observe(document.getElementById('list-end'));
  }

  addProductsToList() {
    const container = document.getElementById('cards-container');

    const filteredProducts = this.listOfProducts.filter(
      (item) =>
        (item.nation === this.filterForProducts.nation || !this.filterForProducts.nation) &&
        (item.tank_type.toLowerCase() === this.filterForProducts.type || !this.filterForProducts.type) &&
        (item.tier.toString() === this.filterForProducts.tier || !this.filterForProducts.tier)
    );

    const productsToRender = filteredProducts
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
    this.#elements.productsList.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
    this.offset = 0;
  }
}

export default new LazyLoad();
