import { ICartOrder } from '../model/cart-order.model';

export const EMPTY_MESSAGE_TEMPLATE = '<span class="empty-message">There are no products in cart yet</span>';

export const ORDER_CONFIRMED_POPUP_TITLE = 'THANKS FOR PURCHASE';

export const DEFAULT_CART_ORDER: ICartOrder = {
  totalCost: 0,
  totalDiscount: 0,
  totalDiscountPercent: 0,
  totalCount: 0,
  currencyCode: '',
};
