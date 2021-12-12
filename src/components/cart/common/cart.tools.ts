import storage from '../../app/components/storage/storage';
import { convertToRomane, localizeCurrency } from '../../../common/common.helper';
import { PRODUCT_TYPE_MACHINERY } from '../../product-item/common/product-item.constants';
import ProductItemInterface from '../../../models/product-item.model';

export const renderCartItem = (cartItem: ProductItemInterface): string => {
  const cartItemInfo =
    cartItem.type === PRODUCT_TYPE_MACHINERY
      ? `
       <span class="flag flag__${cartItem.nation}"></span>
       <span class="tank-type tank-type__${cartItem.tank_type.toLowerCase()}"></span>
       <span class="level">${convertToRomane(cartItem.tier)}</span>
       <span class="item-name">${cartItem.name}</span>
      `
      : `<span class="item-name">${cartItem.name}</span>`;

  const priceDiscount = cartItem.price_discount
    ? localizeCurrency(Number(cartItem.price_discount), cartItem.price.code)
    : '';

  return `
    <article class="cart-item" data-id="${cartItem.id}">
      ${cartItem.discount ? `<div class="discount">-${cartItem.discount}%</div>` : ''}

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
