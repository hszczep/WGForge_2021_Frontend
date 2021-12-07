import './scss/main-page.styles.scss';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    console.log('It is MainPage init()');
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
        const select = item.closest('.tanks-select');
        const currentText = select.querySelector('.tanks-select__current');
        currentText.innerHTML = selectValue;
        select.classList.remove('is-active');
      });
    });

    resetButton.addEventListener('click', () => {
      defaultValue.forEach((value, index) => {
        selectHeader[index].firstElementChild.innerHTML = value.innerHTML;
      });
    });
  }

  unmount() {
    console.log('It is MainPage unmount()');
  }

  render() {
    console.log('It is MainPage render()');
    return `
        <div class="content-menu">
          <a href="#" class="WoT_logo"><img src="assets/images/WoT_logo.png" alt="WoT logo" /></a>
          <div class="content-menu__buttons">
            <button class="active-menu__button">All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>
        </div>
        
        <div class="filter-field">
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
              <div class="tanks-select__item default-value">I-X<span class="tanks-select__value">All Tiers</span></div>
              <div class="tanks-select__item">I<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">II<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">III<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">IV<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">V<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">VI<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">VII<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">IX<span class="tanks-select__value">Levels</span></div>
              <div class="tanks-select__item">X<span class="tanks-select__value">Levels</span></div>    
            </div>
          </div>
          <button class="reset-button">Show all vehicles</button>
        </div>
        <div class="cards-field">
        </div>
    `;
  }
}

export default new MainPageComponent();
