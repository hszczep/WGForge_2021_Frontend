import './scss/admin.styles.scss';

import { currencyLocaleMap } from '../../common/common.constants';
import storage from '../app/components/storage/storage';
import AdminProductItem from './common/admin.product';
import detailsRender from './common/product.details';
import adminService from '../../services/admin.service';
import popup from '../popup/popup';
import { ProductModel } from '../../services/models/productModel';
import mainApiService from '../../services/main-api.service';
import authUserService from '../../services/auth-user.service';
import appController from '../app/components/controller/app.controller';

class AdminPageComponent {
  #currencySelect: HTMLElement = null;
  addItemButton: HTMLElement;

  form: HTMLFormElement;
  discountPriceInput: HTMLInputElement;
  discountInput: HTMLInputElement;
  priceInput: HTMLInputElement;

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    this.addItem = this.addItem.bind(this);
    this.calculateDiscount = this.calculateDiscount.bind(this);
    this.submitProduct = this.submitProduct.bind(this);
  }

  calculateDiscount() {
    const price = Number(this.priceInput.value);
    const discountPrice = Number(this.discountPriceInput.value);
    this.discountInput.value = Math.floor(100 - (discountPrice / price) * 100).toString();
  }

  submitProduct(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const product = {
      ...Object.fromEntries(formData),
      type: formData.getAll('type'),
      images: formData.get('images').toString().split(/\n/),
    } as ProductModel;

    appController.spinner.show();
    adminService
      .createProduct(product)
      .then(() => mainApiService.getProducts())
      .then((products) => {
        storage.setProducts(products);
        this.init();
      })
      .catch((err) => popup.open(err.message))
      .finally(() => appController.spinner.hide());
  }

  init(): void {
    this.#currencySelect = document.querySelector('.currency-select');
    Object.keys(currencyLocaleMap).forEach((el) => {
      this.#currencySelect.innerHTML += `
        <option class='admin-option' ${el === storage.products[0].price.code ? ' selected' : ''}>${el}</option>
      `;
    });
    this.#currencySelect.addEventListener('change', (event: Event) => {
      appController.spinner.show();
      adminService
        .changeCurrency((event.target as HTMLSelectElement).value)
        .then(() => mainApiService.getProducts())
        .then((products) => {
          storage.setProducts(products);
          const listOfProducts = document.querySelector('.items-menu__items-field');
          listOfProducts.replaceChildren(listOfProducts.firstElementChild);
          storage.products.forEach((item) => {
            listOfProducts.append(new AdminProductItem(item).render());
          });
        })
        .then(() => authUserService.updateUserState())
        .catch((error) => popup.open(error.message))
        .finally(() => appController.spinner.hide());
    });
    const listOfProducts = document.querySelector('.items-menu__items-field');
    listOfProducts.replaceChildren(listOfProducts.firstElementChild);
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
    this.discountPriceInput = card.querySelector('.input-discount_price') as HTMLInputElement;
    this.discountInput = card.querySelector('.input-discount') as HTMLInputElement;
    this.priceInput = card.querySelector('.input-price') as HTMLInputElement;
    this.form = card.querySelector('#product-form') as HTMLFormElement;
    const tankInputs = card.querySelectorAll('.tank-select');
    const idInput = card.querySelector('.input-id') as HTMLInputElement;
    idInput.disabled = true;
    const vehicle = 'vehicle';
    const vehicleCheckbox = card.querySelector(`[data-type=${vehicle}]`) as HTMLInputElement;
    const tankInfo = card.querySelector('.tank-info') as HTMLElement;
    tankInfo.style.display = 'none';
    vehicleCheckbox.onchange = () => {
      tankInfo.style.display = vehicleCheckbox.checked ? 'flex' : 'none';
      tankInputs.forEach((el: HTMLInputElement) => {
        el.disabled = !vehicleCheckbox.checked;
      });
    };
    this.priceInput.addEventListener('change', this.calculateDiscount);
    this.discountPriceInput.addEventListener('change', this.calculateDiscount);
    this.form.addEventListener('submit', this.submitProduct);
    cancelButton.onclick = () => {
      card.remove();
    };
  }

  unmount(): void {}

  render(): string {
    return `
    <div class='admin-field'>
      <h2>Admin Page</h2>
      <div class='currency-menu'>
        <p>Choose a currency:</p>
        <select class='admin-select currency-select'></select>
      </div>
      <div class='items-menu'>
        <div class='items-menu__header'>
          <div class='header-info header-name'>Name</div>
          <div class='header-info'>Order</div>
          <div class='header-info'>Price</div>
          <div class='header-info'>Discount</div>
          <div class='header-info header-img'>Img</div>
          <div class='header-info'></div>
        </div>

        <div class='items-menu__items-field'>
          <div class='items-menu__add-item'>
            <svg class='add-button'>
              <use xlink:href='assets/images/sprite.svg#close'></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
`;
  }
}

export default new AdminPageComponent();
