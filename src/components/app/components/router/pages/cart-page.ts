import cartPageComponent from '../../../../cart/cart';
import { IPage } from '../models/page.model';

export const cartPage: IPage = {
  init: cartPageComponent.init,
  unmount: cartPageComponent.unmount,
  render: cartPageComponent.render,
};
