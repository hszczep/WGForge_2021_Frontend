import './scss/main-page.styles.scss';

import FilterComponent from './components/filter/filter';
import storage from '../app/components/storage/storage';
import ProductItemComponent from '../product-item/product-item';
import ProductItemInterface from '../../models/product-item.model';
import favoritesService from '../../services/favorites.service';

const filter = new FilterComponent();

class MainPageComponent {
  listOfProducts: ProductItemInterface[];
  offset: number;
  limit: number;
  listSize: number;
  observer: IntersectionObserver;
  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.offset = 0;
    this.limit = 12;
  }

  init() {
    this.listOfProducts = storage.products;
    this.listSize = this.listOfProducts.length;
    this.#elements = {
      productsList: document.querySelector('.cards-field'),
    };
    this.#elements.productsList.addEventListener('click', favoritesService.favoritesButtonClickHandler);
    filter.init();
    this.addProductsToList();
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => (entry.isIntersecting && this.addProductsToList()));
    });
    this.observer.observe(document.getElementById('list-end'));
  }

  addProductsToList() {
    const container = document.getElementById('cards-container');
    const productsToRender = this.listOfProducts
      .slice(this.offset, Math.min(this.offset + this.limit, this.listSize))
      .map(product => {
        product.isFavorite = storage.checkProductInFavoritesById(product.id);
        return new ProductItemComponent(product).render();
      }).join('');
    this.offset= Math.min(this.offset + this.limit, this.listSize);
    if (this.offset === this.listSize){
      this.observer.disconnect();
    }
    container.insertAdjacentHTML('beforeend', productsToRender);
  }

  unmount() {
    this.observer.disconnect();
    this.#elements.productsList.removeEventListener('click', favoritesService.favoritesButtonClickHandler);
  }

  render() {
    return `
        <div class='content-menu'>
          <a href='#' class='WoT_logo'><img src='assets/images/WoT_logo.png' alt='WoT logo' /></a>
          <div class='content-menu__buttons'>
            <button class='active-menu__button'>All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>
        </div>  
          <div class='filter-field'>${filter.render()}</div>
          <div class='cards-field' id='cards-container'></div>
          <div id='list-end'><div/>
      </div>
    `;
  }
}

export default new MainPageComponent();
