import adminPageComponent from '../../../../admin/admin';
import { IPage } from '../models/page.model';

export const adminPage: IPage = {
  render: adminPageComponent.render,
  init: adminPageComponent.init,
  unmount: adminPageComponent.unmount,
};
