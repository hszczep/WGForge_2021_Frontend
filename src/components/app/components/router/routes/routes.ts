import { mainPage } from '../pages/main-page';
import { signinPage } from '../pages/signin-page';
import { signupPage } from '../pages/signup-page';
import { errorPage } from '../pages/error-page';

import { IRoute } from '../models/route.model';

const routes: IRoute[] = [
  { path: '/', page: mainPage },
  { path: '/signin', page: signinPage },
  { path: '/signup', page: signupPage },
  { path: '/error', page: errorPage },
];

export default routes;
