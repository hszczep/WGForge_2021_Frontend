import { signupPageComponent } from '../../../../auth/auth';
import { IPage } from '../models/page.model';

export const signupPage: IPage = {
  init: signupPageComponent.init,
  unmount: signupPageComponent.unmount,
  render: signupPageComponent.render,
};
