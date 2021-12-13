import './scss/admin.styles.scss';

import { renderAdminItem } from './common/admin.tools';
import {currencyLocaleMap} from "../../common/common.constants";

class AdminPageComponent {
  #currencySelect: HTMLElement = null;
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    this.#currencySelect = document.querySelector('.currency-select');
    Object.keys(currencyLocaleMap).forEach((el) => {
      this.#currencySelect.innerHTML += `<option class="admin-option">${el}</option>`;
    });
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
          <div class="header-info">Priority</div>
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
          ${renderAdminItem()}
        </div>
      </div>
    </div>
`;
  }
}

export default new AdminPageComponent();
