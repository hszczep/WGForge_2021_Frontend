import './scss/favorites.styles.scss';

class FavoritesPageComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init() {}

  unmount() {}

  render() {
    return `
<fieldset class="favorites-field">
  <legend>Wishlist</legend>
  <div class="favorite-item">
    <div class="discount">-10%</div>

    <svg class="delete-button">
      <use xlink:href="assets/images/sprite.svg#close"></use>
    </svg>
    <div class="favorite-item__info">
      <div class="favorite-item__img-block">
        <img
          src="https://catoolwebdav-net-cdn.gcdn.co/catool/f596a14af5be760500eef5ae84b6d9aa.png"
          alt="name"
          class="favorite-item__img"
        />
      </div>
      <div class="favorite-item__text-block">
        <h2 class="favorite-item__text">
          <span class="flag flag__usa"></span>
          <span class="tank-type tank-type__heavytank"></span>
          <span class="level">XIII</span>
          <span class="item-name">Vickers Medium Mk. II</span>
        </h2>

        <div class="favorite-item__description">
          The legend of the Soviet armored forces and the most widely-produced Soviet tank of World War II, with a total
          of 33,805 vehicles manufactured. Three variants of this model were produced at several Soviet factories from
          1940 through 1944.The legend of the Soviet armored forces and the most widely-produced Soviet tank of World
          War II, with a total of 33,805 vehicles manufactured. Three variants of this model were produced at several
          Soviet factories from 1940 through 1944.
        </div>
      </div>
      <div class="favorite-item__price-block">
        <p class="price old-price">$ 13.45</p>
        <p class="price price-discount">$ 10.45</p>
        <button class="purchase-btn">purchase</button>
      </div>
    </div>
  </div>
  <div class="favorite-item">
    <svg class="delete-button">
      <use xlink:href="assets/images/sprite.svg#close"></use>
    </svg>

    <div class="favorite-item__info">
      <div class="favorite-item__img-block">
        <img
          src="http://api-console.worldoftanks.com/static/2.70/wotx/encyclopedia/tanks/big_france_f03_d2.png"
          alt="name"
          class="favorite-item__img"
        />
      </div>
      <div class="favorite-item__text-block">
        <h2 class="favorite-item__text">
          <span class="flag flag__usa"></span>
          <span class="tank-type tank-type__heavytank"></span>
          <span class="level">XIII</span>
          <span class="item-name">Vickers Medium Mk. II</span>
        </h2>

        <div class="favorite-item__description">
          The legend of the Soviet armored forces and the most widely-produced Soviet tank of World War II, with a total
          of 33,805 vehicles manufactured. Three variants of this model were produced at several Soviet factories from
          1940 through 1944.The legend of the Soviet armored forces and the most widely-produced Soviet tank of World
          War II, with a total of 33,805 vehicles manufactured. Three variants of this model were produced at several
          Soviet factories from 1940 through 1944.
        </div>
      </div>
      <div class="favorite-item__price-block">
        <p class="price">$ 100.92</p>
        <p class="price price-discount"></p>
        <button class="purchase-btn">purchase</button>
      </div>
    </div>
  </div>
</fieldset>
      `;
  }
}

export default new FavoritesPageComponent();
