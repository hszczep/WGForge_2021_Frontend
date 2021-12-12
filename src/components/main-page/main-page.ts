import './scss/main-page.styles.scss';
import filter from './components/filter/filter';
import lazyLoad from './components/lazy-load/lazy-load';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    filter.init();
    lazyLoad.init();
  }

  unmount() {}

  render() {
    return `
        <div class='content-menu'>
          <a href='#' class='WoT_logo'><img src='assets/images/WoT_logo.png' alt='WoT logo' /></a>
          <div class='content-menu__buttons'>
            <button class='active-menu__button'>All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>
        </div>  
          <div class='filter-field'>${filter.render()}</div>
          <div class='cards-field' id='cards-container'></div>
          <div id='list-end'></div>
    `;
  }
}

export default new MainPageComponent();
