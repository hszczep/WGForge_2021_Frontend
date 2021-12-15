import storage from '../../../app/components/storage/storage';
import filter from '../filter/filter';
import lazyLoad from '../lazy-load/lazy-load';
import ProductItemInterface from '../../../../models/product-item.model';

class MenuCategories {
  menu: HTMLElement;
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }
  init() {
    console.log('init categories');
    this.menu = document.querySelector('.content-menu__buttons');
    const setActiveButton = this.menu.querySelector(`[data-category='${storage.category}']`);
    setActiveButton.classList.add('active-menu__button');

    const vehiclesCategory = 'machinery';

    if (storage.category === vehiclesCategory) filter.init(this.#changeCategory(storage.products));
    else lazyLoad.init(this.#changeCategory(storage.products));

    this.menu.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      const tagElement = 'BUTTON';

      if (target.tagName === tagElement && !target.classList.contains('active-menu__button')) {
        window.location.hash = '#';
        lazyLoad.unmount();
        const activeButton = this.menu.querySelector('.active-menu__button');

        activeButton.classList.remove('active-menu__button');
        target.classList.add('active-menu__button');
        storage.category = target.dataset.category;
        const cardField = document.querySelector('.cards-field');
        cardField.innerHTML = '';

        const vehiclesFilter = document.querySelector('.filter-field') as HTMLElement;
        if (storage.category === vehiclesCategory) {
          filter.init(this.#changeCategory(storage.products));
          vehiclesFilter.style.display = 'flex';
        } else {
          vehiclesFilter.style.display = 'none';
          lazyLoad.init(this.#changeCategory(storage.products));
        }
      }
    });
  }
  unmount() {
    lazyLoad.unmount();
  }
  #changeCategory(listOfProducts: Array<ProductItemInterface>): Array<ProductItemInterface> {
    const { category } = storage;
    const allCategoris = 'all';
    if (category === allCategoris) return listOfProducts;

    const filteredProducts = listOfProducts.filter((item) => item.type === category);
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
