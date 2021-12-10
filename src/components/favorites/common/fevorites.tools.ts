import convertToRomane from '../../../common/common.helper';
import { PRODUCT_TYPE_MACHINERY } from './favorites.constants';
import { IProductItem } from '../../../models/product-item.model';

export const renderFavoritesItem = (favoritesItem: IProductItem): string => {
  const favoritesItemInfo =
    favoritesItem.type === PRODUCT_TYPE_MACHINERY
      ? `
       <span class="flag flag__${favoritesItem.nation}"></span>
       <span class="tank-type tank-type__${favoritesItem.tank_type.toLowerCase()}"></span>
       <span class="level">${convertToRomane(favoritesItem.tier)}</span>
       <span class="item-name">${favoritesItem.name}</span>
      `
      : `<span class="item-name">${favoritesItem.name}</span>`;

  return `
    <article class="favorite-item" data-id="${favoritesItem.id}">
      ${favoritesItem.discount ? `<div class="discount">-${favoritesItem.discount}%</div>` : ''}

      <svg class="favorite__delete-button">
        <use xlink:href="assets/images/sprite.svg#close"></use>
      </svg>
      <div class="favorite-item__info">
        <div class="favorite-item__img-block">
          <img class="favorite-item__img" src="${favoritesItem.images[0]}" alt="${favoritesItem.name}"/>
        </div>
        <div class="favorite-item__text-block">
          <h2 class="favorite-item__text">
            ${favoritesItemInfo}
          </h2>
          <div class="favorite-item__description">${favoritesItem.details}</div>
        </div>
        <div class="favorite-item__price-block">
          <p class="price${favoritesItem.discount ? ' old-price' : ''}">$${favoritesItem.price}</p>
          <p class="price price-discount">${favoritesItem.discount ? `$${favoritesItem.price_discount}` : ''}</p>
          <button class="purchase-btn">purchase</button>
        </div>
      </div>
    </article>`;
};
