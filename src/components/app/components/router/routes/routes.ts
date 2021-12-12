import { mainPage } from '../pages/main-page';
import { signinPage } from '../pages/signin-page';
import { signupPage } from '../pages/signup-page';
import { favoritesPage } from '../pages/favorites-page';
import { cartPage } from '../pages/cart-page';
import { notFoundPage } from '../pages/not-found-page';
import { productPage } from '../pages/product-page';
import { adminPage } from '../pages/admin-page';

import { IRoute } from '../models/route.model';

const routes: IRoute[] = [
  { path: '/', page: mainPage },
  { path: '/signin', page: signinPage },
  { path: '/signup', page: signupPage },
  { path: '/favorites', page: favoritesPage },
  { path: '/cart', page: cartPage },
  { path: '/notfound', page: notFoundPage },
  { path: '/product/', page: productPage },
  { path: '/admin', page: adminPage },
];

export default routes;
