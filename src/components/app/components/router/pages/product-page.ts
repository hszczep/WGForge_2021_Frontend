import ProductPageComponent from '../../../../product-page/product-page';
import { IPage } from '../models/page.model';

export const productPage: IPage = {
  init: ProductPageComponent.init,
  unmount: ProductPageComponent.unmount,
  render: ProductPageComponent.render,
};
