import mainPageComponent from '../../../../main-page/main-page';
import { IPage } from '../models/page.model';

export const mainPage: IPage = {
  init: mainPageComponent.init,
  unmount: mainPageComponent.unmount,
  render: mainPageComponent.render,
};
