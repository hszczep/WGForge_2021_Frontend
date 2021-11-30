class ProductItemComponent {
  card_size = 'card__single'; // size on table card__single(1) or card__double(2)
  card_id = ''; // item id __ "23525"
  card_href = ''; // link to item page
  card_src = ''; // item img link
  card_alt = ''; // item img description (card_name) __ M56
  card_discount = ''; // item discount (optional) __ -10%
  card_flag = ''; // item flag (optional)
  // flag__china, flag__czech, flag__france, flag__germany, flag__poland, flag__sweden, flag__uk, flag__usa, flag__ussr
  card_tank_type = ''; // item type (optional)
  // __ (type__at-spg, type__heavytank, type__lighttank, type__mediumtank, type__multirole, type__spg)
  card_level = ''; // item level (optional) __ (I-X)
  card_name = ''; // item name __ M56
  card_price = ''; // item price __ $ 99.99
  card_price_discount = ''; // item price discount __ $ 99.99
  card_type = ''; // __ tank, gold, prem
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init() {}

  render() {
    let TankNameInfo;
    if (this.card_type === 'tank') {
      TankNameInfo = `
                  <span class="flag ${this.card_flag}"></span>
                  <span class="tank-type ${this.card_tank_type}"></span>
                  <span class="level">${this.card_level}</span>
                  <span class="item-name">${this.card_name}</span>
      `;
    } else {
      TankNameInfo = `
                  <span class="item-name">${this.card_name}</span>
      `;
    }
    return `
          <article class="card ${this.card_size}" id="${this.card_id}">
            <a href="${this.card_href}" class="card-info">
              <img class="card-img" src="${this.card_src}" alt="${this.card_alt}" />
              <div class="card-specifications">
                <p class="discount">${this.card_discount}</p>
                <h2 class="item-text">
                  ${TankNameInfo}
                </h2>
                <p class="price">${this.card_price}</p>
                <p class="price price-discount">${this.card_price_discount}</p>
              </div>
            </a>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </article>
    `;
  }
}

export default new ProductItemComponent();
