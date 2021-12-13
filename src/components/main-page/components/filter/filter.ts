import './scss/filter.styles.scss';
import storage from '../../../app/components/storage/storage';
import lazyLoad from '../lazy-load/lazy-load';
import { FILTER_MAP } from '../../common/constants';

class FilterComponent {
  init() {
    const selectHeader = document.querySelectorAll('.tanks-select__header');
    const selectItem = document.querySelectorAll('.tanks-select__item');
    const defaultValue = document.querySelectorAll('.default-value');
    const resetButton = document.querySelector('.reset-button');

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
        lazyLoad.init();
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
    lazyLoad.init();
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
