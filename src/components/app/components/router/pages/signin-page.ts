import { signinPageComponent } from '../../../../auth/auth';
import { IPage } from '../models/page.model';

export const signinPage: IPage = {
  init: signinPageComponent.init,
  unmount: signinPageComponent.unmount,
  render: signinPageComponent.render,
};
