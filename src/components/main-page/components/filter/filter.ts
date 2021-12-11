import './scss/filter.styles.scss';
import storage from '../../../app/components/storage/storage';
import ProductItemComponent from '../../../product-item/product-item';
import ProductItemInterface from '../../../app/components/storage/product-item-interface';

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

    selectItem.forEach((item) => {
      item.addEventListener('click', () => {
        const selectValue = item.innerHTML;
        this.apllyFilter(item.firstElementChild.classList.item(1).split('__'));
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
        const defaultValue = '';
        storage.products_filter.nation = defaultValue;
        storage.products_filter.tier = defaultValue;
        storage.products_filter.type = defaultValue;
        const card_field = document.querySelector('.cards-field');
        card_field.innerHTML = this.#render_content(storage.products);
      });
    });
  }

  apllyFilter([type_filter,value_filter]:Array<string>){  
    const {products,products_filter} = storage;
    const nation = 'flag';
    const type = 'tank-type';
    const tier = 'tank-tier';
    const default_filter = 'all';
    switch (type_filter){
       case nation:
        products_filter.nation = value_filter == default_filter ? '' : value_filter;
        break
      case type:
        products_filter.type = value_filter == default_filter ? '' : value_filter;
        break
      case tier:
        products_filter.tier = value_filter == default_filter ? '' : value_filter;
        break
    }
    const card_field = document.querySelector('.cards-field');
    const filtered_products = products.filter(item => {
      if( (item.nation == products_filter.nation || !products_filter.nation) &&
     (item.tank_type.toLowerCase() == products_filter.type || !products_filter.type) &&
     (item.tier.toString() == products_filter.tier || !products_filter.tier)
     )
     return item
    });
    card_field.innerHTML = this.#render_content(filtered_products);
  }

  #render_content(products:Array<ProductItemInterface>):string{
    let string_HTML = '';
    
    for (let i = 0; i < products.length; i++) {
      const item = new ProductItemComponent(products[i]);
      string_HTML += item.render();
    }
    return string_HTML;
  }

  render() {
    const filter_nation = document.createElement('div');
    filter_nation.setAttribute('class','tanks-select select-nation');

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
                <span class="flag flag__all"></span>
                <span class="tanks-select__value">All Nations</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__france"></span>
                <span class="tanks-select__value">France</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__germany"></span>
                <span class="tanks-select__value">Germany</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__italy"></span>
                <span class="tanks-select__value">Italy</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__japan"></span>
                <span class="tanks-select__value">Japan</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__czech"></span>
                <span class="tanks-select__value">Czechoslovakia</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__uk"></span>
                <span class="tanks-select__value">U.K.</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__usa"></span>
                <span class="tanks-select__value">U.S.A.</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__ussr"></span>
                <span class="tanks-select__value">U.S.S.R</span>
              </div>
              <div class="tanks-select__item">
                <span class="flag flag__china"></span>
                <span class="tanks-select__value">China</span>
              </div>    
              <div class="tanks-select__item">
                <span class="flag flag__marc"></span>
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
                <span class="tank-type tank-type__all"></span>
                <span class="tanks-select__value">All Types</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__lighttank"></span>
                <span class="tanks-select__value">Light Tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__mediumtank"></span>
                <span class="tanks-select__value">Medium tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__heavytank"></span>
                <span class="tanks-select__value">Heavy Tanks</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__at-spg"></span>
                <span class="tanks-select__value">Tank DEstroyers</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__spg"></span>
                <span class="tanks-select__value">SPGs</span>
              </div>
              <div class="tanks-select__item">
                <span class="tank-type tank-type__multirole"></span>
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
              <div class="tanks-select__item default-value">I-X<span class="tanks-select__value tank-tier__all">All Tiers</span></div>
              <div class="tanks-select__item">I<span class="tanks-select__value tank-tier__1">Levels</span></div>
              <div class="tanks-select__item">II<span class="tanks-select__value tank-tier__2">Levels</span></div>
              <div class="tanks-select__item">III<span class="tanks-select__value tank-tier__3">Levels</span></div>
              <div class="tanks-select__item">IV<span class="tanks-select__value tank-tier__4">Levels</span></div>
              <div class="tanks-select__item">V<span class="tanks-select__value tank-tier__5">Levels</span></div>
              <div class="tanks-select__item">VI<span class="tanks-select__value tank-tier__6">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value tank-tier__7">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value tank-tier__8">Levels</span></div>
              <div class="tanks-select__item">IX<span class="tanks-select__value tank-tier__9">Levels</span></div>
              <div class="tanks-select__item">X<span class="tanks-select__value tank-tier__10">Levels</span></div>    
            </div>
          </div>
          <button class="reset-button">Show all vehicles</button>
    `;
  }
}

export default FilterComponent;
