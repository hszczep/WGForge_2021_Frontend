import storage from '../../../app/components/storage/storage';
import filter from '../filter/filter';
import lazyLoad from '../lazy-load/lazy-load';
import { ProductItemInterface } from '../../../../models/product-item.model';
import { PRODUCT_TYPE_VEHICLE } from '../../../../common/common.constants';

class MenuCategories {
  menu: HTMLElement;
  vehiclesFilter: HTMLElement;
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }
  init() {
    this.menu = document.querySelector('.content-menu__buttons');
    const setActiveButton = this.menu.querySelector(`[data-category='${storage.category}']`);
    setActiveButton.classList.add('active-menu__button');

    if (window.location.hash === '#' || window.location.hash === '') {
      this.vehiclesFilter = document.querySelector('.filter-field') as HTMLElement;
      this.toggleFilterDisplay(storage.category === PRODUCT_TYPE_VEHICLE);
      this.menu.addEventListener('click', this.changeCategory);
    } else this.menu.addEventListener('click', this.changeCategoryFromItemPage);
  }
  toggleFilterDisplay(visible: boolean) {
    if (visible) {
      this.vehiclesFilter.classList.remove('filter-field_hidden');
      filter.init(this.#filterCategory(storage.products));
    } else {
      this.vehiclesFilter.classList.add('filter-field_hidden');
      lazyLoad.init(this.#filterCategory(storage.products));
    }
  }
  unmount() {
    lazyLoad.unmount();
  }
  changeCategory(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      lazyLoad.unmount();
      const activeButton = this.menu.querySelector('.active-menu__button');
      activeButton.classList.remove('active-menu__button');
      target.classList.add('active-menu__button');
      storage.category = target.dataset.category;

      const cardField = document.querySelector('.cards-field');
      cardField.innerHTML = '';
      this.toggleFilterDisplay(storage.category === PRODUCT_TYPE_VEHICLE);
    }
  }

  changeCategoryFromItemPage(event: Event) {
    const target = event.target as HTMLElement;

    if (target.tagName === 'BUTTON') {
      storage.category = target.dataset.category;
      window.location.hash = '#';
    }
  }
  #filterCategory(listOfProducts: Array<ProductItemInterface>): Array<ProductItemInterface> {
    const { category } = storage;
    if (category === 'all') return listOfProducts;

    return listOfProducts.filter((item) => item.type.includes(category));
  }
  render() {
    return `
        <button data-category='all'>All</button>
        <button data-category='vehicle'>Vehicles</button>
        <button data-category='gold'>Gold</button>
        <button data-category='premium'>Premium account</button>
        `;
  }
}

export default new MenuCategories();
