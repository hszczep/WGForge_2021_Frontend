import ProductItemIinterface from '../app/components/storage/product-item-interface';
import convertToRomane from '../../common/common.helper';
import addPurchase from '../main-page/add-purchase';

class ProductItemComponent implements ProductItemIinterface {
  id: string;
  tier: number;
  type: string;
  name: string;
  price: number;
  price_string: string;
  nation: string;
  images: Array<string>;
  tank_type: string;
  size: string;
  linkToDiscription: string;
  discount: number;
  price_discount: number;
  flag: string;
  constructor({
    tier,
    type,
    name,
    price,
    discount,
    price_discount,
    nation,
    images,
    tank_type,
    id,
  }: ProductItemIinterface) {
    this.id = id;
    this.tier = tier; // tier tank, for render convert expample "4" -> "IV"
    this.type = type; // tank, gold or premium
    this.tank_type = tank_type; // ligth, medium, haevy
    this.name = name; // shor name tank
    this.price = price; // default price $
    this.nation = nation; // country
    this.flag = `flag__${this.nation}`; // for icon flag
    this.images = images; // link image
    this.size = Math.random() > 0.3 ? 'single' : 'double'; // add to JSON
    this.linkToDiscription = `#/product/${this.id}`;
    this.discount = discount; // discont in %  example 10
    this.price_discount = price_discount;

    this.render = this.render.bind(this);
  }

  render() {
    const cardFrame: HTMLElement = document.createElement('article');
    cardFrame.classList.add(`card`, `card__${this.size}`);
    cardFrame.id = this.id;
    let productNameInfo;
    if (this.type === 'machinery') {
      productNameInfo = `
                  <span class="flag ${this.flag}"></span>
                  <span class="tank-type tank-type__${this.tank_type.toLowerCase()}"></span>
                  <span class="level">${convertToRomane(this.tier)}</span>
                  <span class="item-name">${this.name}</span>
      `;
    } else {
      productNameInfo = `
                  <span class="item-name">${this.name}</span>
      `;
    }
    cardFrame.innerHTML = `
      <a href="${this.linkToDiscription}" class="card-info">
        <img class="card-img" src="${this.images[0]}" alt="${this.name}" />
        <div class="card-specifications">
          <p class="discount">${this.discount ? `-${this.discount}%` : ''}</p>
          <h2 class="item-text">
            ${productNameInfo}
          </h2>
          <p class="price${this.discount ? ' old-price' : ''}">$${this.price.toFixed(2)}</p>
          <p class="price price-discount">${this.discount ? `$${this.price_discount.toFixed(2)}` : ''}</p>
        </div>
      </a>
      <button class="like-btn">
        <svg class="like-btn__icon">
          <use xlink:href="assets/images/sprite.svg#like"></use>
        </svg>
      </button>
      <button class="purchase-btn">purchase</button>
`;
    const purchaseButton = cardFrame.querySelector('.purchase-btn');
    purchaseButton.addEventListener('click', addPurchase);
    return cardFrame;
  }
}

export default ProductItemComponent;
