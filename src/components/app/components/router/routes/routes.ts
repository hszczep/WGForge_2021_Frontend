import { mainPage } from '../pages/main-page';
import { signinPage } from '../pages/signin-page';
import { signupPage } from '../pages/signup-page';
import { favoritesPage } from '../pages/favorites-page';
import { notFoundPage } from '../pages/not-found-page';

import { IRoute } from '../models/route.model';

const routes: IRoute[] = [
  { path: '/', page: mainPage },
  { path: '/signin', page: signinPage },
  { path: '/signup', page: signupPage },
  { path: '/favorites', page: favoritesPage },
  { path: '/error', page: notFoundPage },
];

export default routes;
