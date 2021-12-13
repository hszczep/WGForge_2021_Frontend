import adminPageComponent from '../../../../admin/admin';
import { IPage } from '../models/page.model';

export const adminPage: IPage = {
  init: adminPageComponent.init,
  unmount: adminPageComponent.unmount,
  render: adminPageComponent.render,
};
