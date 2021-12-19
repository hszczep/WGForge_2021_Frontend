import './scss/admin.styles.scss';

import { currencyLocaleMap } from '../../common/common.constants';
import storage from '../app/components/storage/storage';
import AdminProductItem from './common/admin.product';
import detailsRender from './common/product.details';
import adminService from '../../services/admin.service';
import popup from '../popup/popup';

class AdminPageComponent {
  #currencySelect: HTMLElement = null;
  addItemButton: HTMLElement;
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  init(): void {
    this.#currencySelect = document.querySelector('.currency-select');
    Object.keys(currencyLocaleMap).forEach((el) => {
      this.#currencySelect.innerHTML += `<option class="admin-option">${el}</option>`;
    });

    this.#currencySelect.addEventListener('change', (event: Event) => {
      adminService
        .changeCurrency((event.target as HTMLSelectElement).value)
        .catch((error) => popup.open(error.message));
    });

    const listOfProducts = document.querySelector('.items-menu__items-field');
    storage.products.forEach((item) => {
      listOfProducts.append(new AdminProductItem(item).render());
    });
    this.addItemButton = document.querySelector('.items-menu__add-item');
    this.addItemButton.addEventListener('click', this.addItem);
  }

  addItem() {
    const card = document.createElement('article');
    card.classList.add('item-card', 'active-card');
    card.append(detailsRender());
    this.addItemButton.after(card);
    const cancelButton = card.querySelector('.cancel-btn') as HTMLElement;

    const vehicle = 'vehicle';
    const vehicleCheckbox = card.querySelector(`[data-type=${vehicle}]`) as HTMLInputElement;
    const tankInfo = card.querySelector('.tank-info') as HTMLElement;
    tankInfo.style.display = 'none';
    vehicleCheckbox.onchange = () => {
      tankInfo.style.display = vehicleCheckbox.checked ? 'flex' : 'none';
    };

    cancelButton.onclick = () => {
      // *********** !!!ONLY FOR TESTING!!! ***********
      adminService
        .addNewProduct({
          name: 't-43',
          type: 'vehicle',
          details: 'cool tank',
          base_price: 123,
          tier: 1,
          nation: 'uk',
          tank_type: 'heavyTank',
          price_discount: 10,
          base_price_discount: 10,
          price_amount: 20,
        })
        .then((response) => console.log(response))
        .catch((error) => popup.open(error.message));
      // ********************************************

      card.remove();
    };
  }

  unmount(): void {}

  render(): string {
    return `
    <div class="admin-field">
      <h2>Admin Page</h2>
      <div class="currency-menu">
        <p>Choose a currency:</p>
        <select class="admin-select currency-select"></select>
      </div>
      <div class="items-menu">
        <div class="items-menu__header">
          <div class="header-info header-name">Name</div>
          <div class="header-info">Order</div>
          <div class="header-info">Price</div>
          <div class="header-info">Discount</div>
          <div class="header-info">Size</div>
          <div class="header-info header-img">Img</div>
          <div class="header-info"></div>
        </div>
        <div class="items-menu__items-field">
          <div class="items-menu__add-item">
            <svg class="add-button">
              <use xlink:href="assets/images/sprite.svg#close"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
`;
  }
}

export default new AdminPageComponent();
