import { notFoundPage } from './pages/not-found-page';

import appController from '../controller/app.controller';
import routes from './routes/routes';

import { checkIsProductById, getLocationPath, isRouteHasPath } from './common/router.helper';

import { PAGES_URL_REG_EXPS, PATHS } from './common/router.constants';

import { IPage } from './models/page.model';
import { IRoute } from './models/route.model';
import storage from '../storage/storage';

class Router {
  mainContainer: HTMLElement = null;
  previousPage: IPage = null;

  constructor() {
    this.route = this.route.bind(this);
  }

  findPageByPath(currentPath: string): IRoute {
    return (
      routes.find((route: IRoute) => isRouteHasPath(route, currentPath)) || {
        path: PATHS.NOT_FOUND,
        page: notFoundPage,
      }
    );
  }

  route(): void {
    if (this.previousPage && this.previousPage.unmount) this.previousPage.unmount();
    let currentPath = getLocationPath();

    // ROUTER GUARDS
    if (PAGES_URL_REG_EXPS.PRODUCT.test(currentPath)) {
      const productId = currentPath.split('/').pop();
      // FOR 'PRODUCT' PAGE
      currentPath = checkIsProductById(productId) ? PATHS.PRODUCT : PATHS.NOT_FOUND;
    } else if (
      // FOR 'SIGIN' AND 'SIGNOUT' PAGES
      (PAGES_URL_REG_EXPS.AUTH.test(currentPath) && storage.checkIsUserLogged()) ||
      // FOR 'FAVORITES' AND 'CART' PAGES
      (PAGES_URL_REG_EXPS.SUBMENU.test(currentPath) && !storage.checkIsUserLogged())
    ) {
      window.location.hash = '#';
      return;
    }

    const { page } = this.findPageByPath(currentPath);
    this.previousPage = page;
    appController.spinner.show();

    this.mainContainer.innerHTML = '';
    const pageMarkup: string = page.render();

    appController.spinner.hide();

    this.mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
    if (page.init) page.init();
  }

  init(): void {
    this.mainContainer = document.querySelector('.app');
    window.addEventListener('hashchange', this.route);
    this.route();
  }
}

export default new Router();
