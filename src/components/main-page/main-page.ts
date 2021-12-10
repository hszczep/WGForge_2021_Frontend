import './scss/main-page.styles.scss';

import FilterComponent from './components/filter/filter';
import storage from '../app/components/storage/storage';
import ProductItemComponent from '../product-item/product-item';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    FilterComponent.init();
  }

  unmount() {}

  render(): DocumentFragment {
    const listOfProducts = storage.products;

    const fragmentContainer = document.createDocumentFragment();
    const contentMenu = document.createElement('div');
    contentMenu.classList.add('content-menu');

    contentMenu.innerHTML = `<a href="#" class="WoT_logo"><img src="assets/images/WoT_logo.png" alt="WoT logo" /></a>
          <div class="content-menu__buttons">
            <button class="active-menu__button">All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>`;

    const cardsFilter = document.createElement('div');
    cardsFilter.classList.add('filter-field');
    cardsFilter.innerHTML = FilterComponent.render();

    const cardsField = document.createElement('div');
    cardsField.classList.add('cards-field');

    for (let i = 0; i < listOfProducts.length; i++) {
      const item = new ProductItemComponent(listOfProducts[i]);
      cardsField.append(item.render());
    }

    fragmentContainer.append(contentMenu);
    fragmentContainer.append(cardsFilter);
    fragmentContainer.append(cardsField);

    return fragmentContainer;
  }
}

export default new MainPageComponent();
