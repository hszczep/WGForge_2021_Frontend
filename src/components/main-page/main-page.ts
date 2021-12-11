import './scss/main-page.styles.scss';

import FilterComponent from './components/filter/filter';
import storage from '../app/components/storage/storage';
import ProductItemComponent from '../product-item/product-item';

const filter = new FilterComponent();

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    filter.init();
  }

  unmount() {}

  render() {
    const listOfProducts = storage.products;

    const fragment = document.createElement('div');
    fragment.classList.add('cards-field');

    for (let i = 0; i < listOfProducts.length; i++) {
      const item = new ProductItemComponent(listOfProducts[i]);
      fragment.innerHTML += item.render();
    }

    return `
        <div class="content-menu">
          <a href="#" class="WoT_logo"><img src="assets/images/WoT_logo.png" alt="WoT logo" /></a>
          <div class="content-menu__buttons">
            <button class="active-menu__button">All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>
        </div>  
          <div class="filter-field">${filter.render()}</div>
          ${fragment.outerHTML}
      </div>
    `;
  }
}

export default new MainPageComponent();
