import { mainPage } from '../pages/main-page';
import { signinPage } from '../pages/signin-page';
import { signupPage } from '../pages/signup-page';
import { favoritesPage } from '../pages/favorites-page';
import { errorPage } from '../pages/error-page';
import { productPage } from '../pages/product-page';

import { IRoute } from '../models/route.model';

const routes: IRoute[] = [
  { path: '/', page: mainPage },
  { path: '/signin', page: signinPage },
  { path: '/signup', page: signupPage },
  { path: '/favorites', page: favoritesPage },
  { path: '/error', page: errorPage },
  { path: '/product/', page: productPage },
];

export default routes;
