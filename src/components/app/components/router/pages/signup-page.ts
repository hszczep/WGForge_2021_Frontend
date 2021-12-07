import authPageComponent from '../../../../auth/auth';
import { IPage } from '../models/page.model';

export const signupPage: IPage = {
  init: authPageComponent.initSignupPage,
  unmount: authPageComponent.unmount,
  render: authPageComponent.renderSignupPage,
};
