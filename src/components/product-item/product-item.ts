import ProductItemInterface from '../app/components/storage/product-item-interface';
import ProductItemComponentInterface from './product-item-interface';
import { convertToRomane, localizeCurrency } from '../../common/common.helper';

class ProductItemComponent implements ProductItemComponentInterface {
  id: string;
  tier: number;
  type: string;
  name: string;
  price: string;
  nation: string;
  images: Array<string>;
  tank_type: string;
  size: string;
  linkToDescription: string;
  discount: number;
  price_discount: string;
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
  }: ProductItemInterface) {
    this.id = id;
    this.tier = tier; // tier tank, for render convert example "4" -> "IV"
    this.type = type; // tank, gold or premium
    this.tank_type = tank_type.toLowerCase(); // light, medium, heavy
    this.name = name; // shor name tank
    this.price = localizeCurrency(Number(price.amount), price.code); // default price $
    this.nation = nation; // country
    this.flag = `flag__${this.nation}`; // for icon flag
    this.images = images; // link image
    this.size = 'single'; // add to JSON
    this.linkToDescription = `#/product/${this.id}`;
    if (discount > 0) {
      this.discount = discount; // discount in %  example 10
      this.price_discount = price_discount ? localizeCurrency(Number(price_discount), price.code) : '';
    }
    this.render = this.render.bind(this);
  }

  render() {
    let productNameInfo;
    if (this.type === 'machinery') {
      productNameInfo = `
                  <span class="flag ${this.flag}"></span>
                  <span class="tank-type tank-type__${this.tank_type}"></span>
                  <span class="level">${convertToRomane(this.tier)}</span>
                  <span class="item-name">${this.name}</span>
      `;
    } else {
      productNameInfo = `
                  <span class="item-name">${this.name}</span>
      `;
    }
    return `
          <article class="card card__${this.size}" id="${this.id}">
            <a href="${this.linkToDescription}" class="card-info">
              <img class="card-img" src="${this.images[0]}" alt="${this.name}" />
              <div class="card-specifications">
                <p class="discount">${this.discount ? `-${this.discount}%` : ''}</p>
                <h2 class="item-text">
                  ${productNameInfo}
                </h2>
                <p class="price${this.discount ? ' old-price' : ''}">${this.price}</p>
                <p class="price price-discount">${this.discount ? `${this.price_discount}` : ''}</p>
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

export default ProductItemComponent;
