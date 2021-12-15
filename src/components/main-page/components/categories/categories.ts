import storage from '../../../app/components/storage/storage';
import filter from '../filter/filter';
import lazyLoad from '../lazy-load/lazy-load';
import ProductItemInterface from '../../../../models/product-item.model';

class MenuCategories {
  menu: HTMLElement;
  vehiclesFilter: HTMLElement;
  vehiclesCategory: string;
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
      this.vehiclesCategory = 'machinery';
      this.vehiclesFilter = document.querySelector('.filter-field') as HTMLElement;

      if (storage.category === this.vehiclesCategory) {
        this.vehiclesFilter.style.display = 'flex';
        filter.init(this.#filterCategory(storage.products));
      } else {
        this.vehiclesFilter.style.display = 'none';
        lazyLoad.init(this.#filterCategory(storage.products));
      }
      this.menu.addEventListener('click', this.changeCategory);
    } else this.menu.addEventListener('click', this.simpleWork);
  }
  unmount() {
    lazyLoad.unmount();
  }
  changeCategory(event: Event) {
    const target = event.target as HTMLElement;
    const tagButton = 'BUTTON';

    if (target.tagName === tagButton) {
      lazyLoad.unmount();
      const activeButton = this.menu.querySelector('.active-menu__button');
      activeButton.classList.remove('active-menu__button');
      target.classList.add('active-menu__button');
      storage.category = target.dataset.category;

      const cardField = document.querySelector('.cards-field');
      cardField.innerHTML = '';

      if (storage.category === this.vehiclesCategory) {
        filter.init(this.#filterCategory(storage.products));
        this.vehiclesFilter.style.display = 'flex';
      } else {
        this.vehiclesFilter.style.display = 'none';
        lazyLoad.init(this.#filterCategory(storage.products));
      }
    }
  }
  simpleWork(event: Event) {
    const target = event.target as HTMLElement;
    const tagButton = 'BUTTON';

    if (target.tagName === tagButton) {
      storage.category = target.dataset.category;
      window.location.hash = '';
    }
  }
  #filterCategory(listOfProducts: Array<ProductItemInterface>): Array<ProductItemInterface> {
    const { category } = storage;
    const allCategoris = 'all';
    if (category === allCategoris) return listOfProducts;

    const filteredProducts = listOfProducts.filter((item) => item.type.includes(category));
    return filteredProducts;
  }
  render() {
    return `
        <button data-category='all'>All</button>
        <button data-category='machinery'>Vehicles</button>
        <button data-category='gold'>Gold</button>
        <button data-category='premium'>Premium account</button>
        `;
  }
}

export default new MenuCategories();
