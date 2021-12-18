import storage from '../../app/components/storage/storage';
import { convertToRomane, formatDiscount, localizeCurrency } from '../../../common/common.helper';
import { ProductItemInterface } from '../../../models/product-item.model';
import { PRODUCT_TYPE_VEHICLE } from '../../../common/common.constants';

export const renderCartItem = (cartItem: ProductItemInterface): string => {
  const cartItemInfo =
    cartItem.type.includes(PRODUCT_TYPE_VEHICLE)
      ? `
       <span class="flag flag__${cartItem.nation}"></span>
       <span class="tank-type tank-type__${cartItem.tank_type.toLowerCase()}"></span>
       <span class="level">${convertToRomane(cartItem.tier)}</span>
       <span class="item-name">${cartItem.name}</span>
      `
      : `<span class="item-name">${cartItem.name}</span>`;
  const {discount,price_discount,discount_show_type,price} = cartItem;
  const discountFormatted = formatDiscount(discount,price_discount,discount_show_type,price);
  const priceDiscount = cartItem.price_discount
    ? localizeCurrency(Number(cartItem.price_discount), cartItem.price.code)
    : '';

  return `
    <article class="cart-item" data-id="${cartItem.id}">
      ${cartItem.discount ? `<div class="discount">${discountFormatted}</div>` : ''}

      <svg class="cart__delete-button">
        <use xlink:href="assets/images/sprite.svg#close"></use>
      </svg>
      <div class="cart-item__info">
        <div class="cart-item__img-block">
          <img class="cart-item__img" src="${cartItem.images[0]}" alt="${cartItem.name}"/>
        </div>
        <div class="cart-item__text-block">
          <h2 class="cart-item__text">
            ${cartItemInfo}
          </h2>
          <div class="cart-item__description">${cartItem.details}</div>
        </div>
        <div class="cart-item__wrapper">
          <div class="cart-item__price-block">
            <p class="price${cartItem.discount ? ' old-price' : ''}">
              ${localizeCurrency(Number(cartItem.price.amount), cartItem.price.code)}
            </p>
            <p class="price price-discount">
              ${priceDiscount}
            </p>
          </div>
          <button class="like-btn ${storage.checkProductInFavoritesById(cartItem.id) ? 'like-btn__active' : ''}">
            <svg class="like-btn__icon">
              <use xlink:href="assets/images/sprite.svg#like"></use>
            </svg>
          </button>
        </div>
      </div>
    </article>`;
};
