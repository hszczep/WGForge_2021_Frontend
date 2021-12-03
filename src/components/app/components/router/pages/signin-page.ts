import authPageComponent from '../../../../auth/auth';
import { IPage } from '../models/page.model';

export const signinPage: IPage = {
  init: authPageComponent.initSigninPage,
  unmount: authPageComponent.unmount,
  render: authPageComponent.renderSigninPage,
};
