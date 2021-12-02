import './scss/main-page.styles.scss';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    console.log('It is MainPage init()');
  }

  unmount() {
    console.log('It is MainPage unmount()');
  }

  render() {
    console.log('It is MainPage render()');
    // delete all articles after parsing
    return `
      <div class="content-field">
        <div class="content-menu">
          <a href="#" class="WoT_logo"><img src="assets/images/WoT_logo.png" alt="WoT logo" /></a>
          <div class="content-menu__buttons">
            <button class="active-menu__button">All</button>
            <button>Vehicles</button>
            <button>Gold</button>
            <button>Premium account</button>
          </div>
        </div>
        <div class="cards-field">
          <article class="card card__single">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/is6.png" alt="ИС-6" />
              <div class="card-specifications">
                <p class="discount">-10%</p>
                <h2 class="item-text">
                  <span class="flag flag__ussr"></span>
                  <span class="tank-type tank-type__at-spg"></span>
                  <span class="level">VIII</span>
                  <span class="item-name">ИС-6</span>
                </h2>
                <p class="price old-price">$ 20.99</p>
                <p class="price price-discount">$ 13.43</p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
          <article class="card card__double">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/M56.png" alt="M56" />
              <div class="card-specifications">
                <p class="discount"></p>
                <h2 class="item-text">
                  <span class="flag flag__uk"></span>
                  <span class="tank-type tank-type__heavytank"></span>
                  <span class="level">VII</span>
                  <span class="item-name">M56 dgdrgr grdg drgdrgdrgrdgrd</span>
                </h2>
                <p class="price">$ 1.00</p>
                <p class="price price-discount"></p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
          <article class="card card__double">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/M56.png" alt="M56" />
              <div class="card-specifications">
                <p class="discount"></p>
                <h2 class="item-text">
                  <span class="flag flag__czech"></span>
                  <span class="tank-type tank-type__lighttank"></span>
                  <span class="level">V</span>
                  <span class="item-name">M56</span>
                </h2>
                <p class="price">$ 66.99</p>
                <p class="price price-discount"></p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
          <article class="card card__single">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/is6.png" alt="ИС-6" />
              <div class="card-specifications">
                <p class="discount"></p>
                <h2 class="item-text">
                  <span class="flag flag__china"></span>
                  <span class="tank-type tank-type__multirole"></span>
                  <span class="level">III</span>
                  <span class="item-name">ИС-9</span>
                </h2>
                <p class="price">$ 100.99</p>
                <p class="price price-discount"></p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
          <article class="card card__single">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/M56.png" alt="M56" />
              <div class="card-specifications">
                <p class="discount"></p>
                <h2 class="item-text">
                  <span class="flag flag__sweden"></span>
                  <span class="tank-type tank-type__mediumtank"></span>
                  <span class="level">X</span>
                  <span class="item-name">M56</span>
                </h2>
                <p class="price">$ 0.99</p>
                <p class="price price-discount"></p>
              </div>
            </a>
            <button class="like-btn like-btn__active">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
                    <article class="card card__single">
            <a href="#" class="card-info">
              <img class="card-img" src="assets/images/M56.png" alt="gold" />
              <div class="card-specifications">
                <p class="discount"></p>
                <h2 class="item-text">
                  <span class="item-name">360 дней танкового премиум аккаунта</span>
                </h2>
                <p class="price">$ 100.99</p>
                <p class="price price-discount"></p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
        </div>
      </div>
    `;
  }
}

export default new MainPageComponent();
