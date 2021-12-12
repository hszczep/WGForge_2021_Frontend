import './scss/filter.styles.scss';
import storage from '../../../app/components/storage/storage';
import lazyLoad from '../lazy-load/lazy-load';

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
        lazyLoad.offset = 0;
        lazyLoad.addProductsToList();
        lazyLoad.addProductsToList();
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
    lazyLoad.offset = 0;
    lazyLoad.addProductsToList();
    lazyLoad.addProductsToList();
  }

  render() {
    return `  
          <div class="tanks-select select-nation">
            <div class="tanks-select__header">
              <p class="tanks-select__current">
                <span class="flag flag__all"></span>
                <span class="tanks-select__value">All Nations</span>
              </p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">
                <span class="flag flag__all" data-nation="all"></span>
                <span class="tanks-select__value">All Nations</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__france" data-nation="france"></span>
                <span class="tanks-select__value">France</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__germany" data-nation="germany"></span>
                <span class="tanks-select__value">Germany</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__italy" data-nation="italy"></span>
                <span class="tanks-select__value">Italy</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__japan" data-nation="japan"></span>
                <span class="tanks-select__value">Japan</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__czech" data-nation="czech"></span>
                <span class="tanks-select__value">Czechoslovakia</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__uk" data-nation="uk"></span>
                <span class="tanks-select__value">U.K.</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__usa" data-nation="usa"></span>
                <span class="tanks-select__value">U.S.A.</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__ussr" data-nation="ussr"></span>
                <span class="tanks-select__value">U.S.S.R</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__china" data-nation="china"></span>
                <span class="tanks-select__value">China</span>
              </div>    
              <div class="tanks-select__item">
                <span class="flag flag__marc" data-nation="marc"></span>
                <span class="tanks-select__value">Mercenary</span>
              </div>
            </div>
          </div>
          <div class="tanks-select select-tank-type">
            <div class="tanks-select__header">
              <p class="tanks-select__current">
                <span class="tank-type tank-type__all"></span>
                <span class="tanks-select__value">All Types</span>
              </p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">
                <span class="tank-type tank-type__all" data-type="all"></span>
                <span class="tanks-select__value">All Types</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__lighttank" data-type="lighttank"></span>
                <span class="tanks-select__value">Light Tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__mediumtank" data-type="mediumtank"></span>
                <span class="tanks-select__value">Medium tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__heavytank" data-type="heavytank"></span>
                <span class="tanks-select__value">Heavy Tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__at-spg" data-type="at-spg"></span>
                <span class="tanks-select__value">Tank DEstroyers</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__spg" data-type="spg"></span>
                <span class="tanks-select__value">SPGs</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__multirole" data-type="multirole"></span>
                <span class="tanks-select__value">Multirole fighter</span>
              </div>
            </div>
          </div>
          <div class="tanks-select select-level">
            <div class="tanks-select__header">
              <p class="tanks-select__current">I-X<span class="tanks-select__value">All Tiers</span></p>
              <svg class="tanks-select__icon">
                <use xlink:href="assets/images/sprite.svg#arrow"></use>
              </svg>
            </div>
            <div class="tanks-select__body">
              <div class="tanks-select__item default-value">I-X
                <span class="tanks-select__value" data-tier="all">All Tiers</span>
              </div>
              <div class="tanks-select__item">I<span class="tanks-select__value" data-tier="1">Levels</span></div>
              <div class="tanks-select__item">II<span class="tanks-select__value" data-tier="2">Levels</span></div>
              <div class="tanks-select__item">III<span class="tanks-select__value" data-tier="3">Levels</span></div>
              <div class="tanks-select__item">IV<span class="tanks-select__value" data-tier="4">Levels</span></div>
              <div class="tanks-select__item">V<span class="tanks-select__value" data-tier="5">Levels</span></div>
              <div class="tanks-select__item">VI<span class="tanks-select__value" data-tier="6">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value" data-tier="7">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value" data-tier="8">Levels</span></div>
              <div class="tanks-select__item">IX<span class="tanks-select__value" data-tier="9">Levels</span></div>
              <div class="tanks-select__item">X<span class="tanks-select__value" data-tier="10">Levels</span></div>    
            </div>
          </div>
          <button class="reset-button">Show all vehicles</button>
    `;
  }
}

export default new FilterComponent();
