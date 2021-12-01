import { mainPage } from '../pages/main-page';
import { errorPage } from '../pages/error-page';
import { testPage } from '../pages/test-page';
import { productPage } from '../pages/product-page';

import { IRoute } from '../models/route.model';

const routes: IRoute[] = [
  { path: '/', page: mainPage },
  { path: '/test', page: testPage },
  { path: '/error', page: errorPage },
  { path: '/product/', page: productPage},
];

export default routes;
