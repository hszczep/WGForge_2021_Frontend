import './scss/filter.styles.scss';
import storage from '../../../app/components/storage/storage';
import lazyLoad from '../lazy-load/lazy-load';
import { FILTER_MAP } from '../../common/constants';
import ProductItemInterface from '../../../../models/product-item.model';

class FilterComponent {
  listOfProducts: Array<ProductItemInterface>;
  init(listOfProducts: Array<ProductItemInterface>) {
    this.listOfProducts = listOfProducts;
    lazyLoad.init(this.#filtratedListOfProducts(listOfProducts));

    const selectHeader = document.querySelectorAll('.tanks-select__header');
    const selectItem = document.querySelectorAll('.tanks-select__item');
    const defaultValue = document.querySelectorAll('.default-value');
    const resetButton = document.querySelector('.reset-button');
    const tanksFilter = document.querySelector('.filter-field') as HTMLElement;
    const tankCategory = 'machinery';

    if (storage.category !== tankCategory) tanksFilter.style.display = 'none';

    selectHeader.forEach((item) => {
      item.addEventListener('click', () => {
        item.parentElement.classList.toggle('is-active');
      });
    });

    selectItem.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        const selectValue = item.innerHTML;
        const firstChild = item.firstElementChild as HTMLElement;
        this.applyFilter(Object.entries(firstChild.dataset).pop());
        const select = item.closest('.tanks-select');
        const currentText = select.querySelector('.tanks-select__current');
        currentText.innerHTML = selectValue;
        select.classList.remove('is-active');
      });
    });

    resetButton.addEventListener('click', () => {
      defaultValue.forEach((value, index) => {
        selectHeader[index].parentElement.classList.remove('is-active');
        selectHeader[index].firstElementChild.innerHTML = value.innerHTML;
        const defaultFilterValue = '';
        storage.productsFilter.nation = defaultFilterValue;
        storage.productsFilter.tier = defaultFilterValue;
        storage.productsFilter.type = defaultFilterValue;
        const cardField = document.querySelector('.cards-field');
        cardField.innerHTML = '';
        lazyLoad.unmount();
        lazyLoad.init(this.listOfProducts);
      });
    });
  }

  applyFilter([typeFilter, valueFilter]: Array<string>) {
    const { productsFilter } = storage;
    const nation = 'nation';
    const type = 'type';
    const tier = 'tier';

    const defaultFilter = 'all';
    switch (typeFilter) {
      case nation:
        productsFilter.nation = valueFilter === defaultFilter ? '' : valueFilter;
        break;
      case type:
        productsFilter.type = valueFilter === defaultFilter ? '' : valueFilter;
        break;
      case tier:
        productsFilter.tier = valueFilter === defaultFilter ? '' : valueFilter;
        break;
      default:
        break;
    }
    const cardField = document.querySelector('.cards-field');
    cardField.innerHTML = '';
    lazyLoad.unmount();
    lazyLoad.init(this.#filtratedListOfProducts(this.listOfProducts));
  }

  #filtratedListOfProducts(incomeListOfProducts: Array<ProductItemInterface>): Array<ProductItemInterface> {
    const filter = storage.productsFilter;
    const filteredProducts = incomeListOfProducts.filter(
      (item) =>
        (item.nation === filter.nation || !filter.nation) &&
        (item.tank_type.toLowerCase() === filter.type || !filter.type) &&
        (item.tier.toString() === filter.tier || !filter.tier)
    );
    return filteredProducts;
  }

  render() {
    const { nation, type, tier } = storage.productsFilter;
    const defaultFilter = 'all';
    const specialTypeTank = 'at-spg';
    let tierCounte = 0;
    return `  
          <div class="tanks-select select-nation">
            <div class="tanks-select__header">
              <p class="tanks-select__current">
                ${FILTER_MAP.nation[nation || defaultFilter]}
              </p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">
              ${FILTER_MAP.nation.all}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.france}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.germany}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.italy}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.japan}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.czech}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.uk}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.usa}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.ussr}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.china}
              </div>    
              <div class="tanks-select__item">
              ${FILTER_MAP.nation.merc}
              </div>
            </div>
          </div>
          <div class="tanks-select select-tank-type">
            <div class="tanks-select__header">
              <p class="tanks-select__current">
              ${FILTER_MAP.type[type || defaultFilter]}
              </p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">
              ${FILTER_MAP.type.all}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type.lighttank}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type.mediumtank}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type.heavytank}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type[specialTypeTank] /* All style for this tank type use "-" */} 
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type.spg}
              </div>
              <div class="tanks-select__item">
              ${FILTER_MAP.type.multirole}
              </div>
            </div>
          </div>
          <div class="tanks-select select-level">
            <div class="tanks-select__header">
              <p class="tanks-select__current">${FILTER_MAP.tier[tier || defaultFilter]}</span></p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">I-X
                <span class="tanks-select__value" data-tier="all">All Tiers</span>
              </div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
              <div class="tanks-select__item">${FILTER_MAP.tier[++tierCounte]}</div>
            </div>
          </div>
          <button class="reset-button">Show all vehicles</button>
    `;
  }
}

export default new FilterComponent();
