import IProductItemComponent from './models/product-item-interface';
import { convertToRomane, formatDiscount, localizeCurrency } from '../../common/common.helper';
import { ProductItemInterface, ProductPrice } from '../../models/product-item.model';
import storage from '../app/components/storage/storage';
import { PRODUCT_TYPE_VEHICLE } from '../../common/common.constants';

class ProductItemComponent implements IProductItemComponent {
  id: string;
  tier: number;
  type: string | Array<string>;
  name: string;
  price: ProductPrice;
  nation: string;
  images: Array<string>;
  tank_type: string;
  discount_show_type: string;
  linkToDescription: string;
  discount: number;
  price_discount:  number;
  flag: string;
  isFavorite: boolean;

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
    discount_show_type,
    isFavorite,
  }: ProductItemInterface) {
    this.id = id;
    this.tier = tier; // tier tank, for render convert example "4" -> "IV"
    this.type = type; // tank, gold or premium
    this.tank_type = tank_type ? tank_type.toLowerCase() : ''; // light, medium, heavy
    this.name = name; // shor name tank
    this.price = price; // default price $
    this.nation = nation; // country
    this.flag = `flag__${this.nation}`; // for icon flag
    this.images = images; // link image
    this.linkToDescription = `#/product/${this.id}`;
    this.discount = discount; // discount in %  example 10
    this.price_discount = price_discount
    this.discount_show_type = discount_show_type;
    this.isFavorite = isFavorite;
    this.render = this.render.bind(this);
  }

  render() {
    let productNameInfo;
    if (this.type.includes(PRODUCT_TYPE_VEHICLE)) {
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
    const {discount,price_discount,discount_show_type,price} = this;
    const discountFormatted = formatDiscount(discount,price_discount,discount_show_type,price);
    const discountPriceLocalized = localizeCurrency(price_discount, price.code);
    const priceLocalized = localizeCurrency(price.amount, price.code);

    const isInCart = storage.checkProductInCartById(this.id);

    return `
          <article class="card card__single" data-id="${this.id}">
            <a href="${this.linkToDescription}" class="card-info">
              <img class="card-img" src="${this.images[0]}" alt="${this.name}" />
              <div class="card-specifications">
                <p class="discount">${discountFormatted}</p>
                <h2 class="item-text">
                  ${productNameInfo}
                </h2>
                <p class="price${this.discount ? ' old-price' : ''}">${priceLocalized}</p>
                <p class="price price-discount">${this.discount ? discountPriceLocalized : ''}</p>
              </div>
            </a>
            <button class="like-btn ${this.isFavorite ? 'like-btn__active' : ''}">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn ${isInCart ? 'purchase-btn__active' : ''}">purchase</button>
          </article>
    `;
  }
}

export default ProductItemComponent;
