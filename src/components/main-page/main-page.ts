import './scss/main-page.styles.scss';

import storage from '../app/components/storage/storage';
import ProductItemComponent from '../product-item/product-item';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
  }

  render(): DocumentFragment {
    const listOfProducts = storage.mainData;

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

    const cardsField = document.createElement('div');
    cardsField.classList.add('cards-field');

    for (let i = 0; i < listOfProducts.length; i++) {
      const item = new ProductItemComponent(listOfProducts[i]);
      cardsField.append(item.render());
    }

    fragmentContainer.append(contentMenu);
    fragmentContainer.append(cardsField);

    return fragmentContainer;
  }
}

export default new MainPageComponent();
