import { errorPage } from './pages/error-page';

import appController from '../controller/app.controller';
import routes from './routes/routes';

import { checkIsProductById, getLocationPath, isRouteHasPath } from './common/router.helper';

import { authPagesURLRegExp, productPageURLRegExp } from './common/router.constants';

import { IPage } from './models/page.model';
import { IRoute } from './models/route.model';
import storage from '../storage/storage';

class Router {
  mainContainer: HTMLElement = null;
  previousPage: IPage = null;

  constructor() {
    this.route = this.route.bind(this);
  }

  findPageByPath(currentPath: string) {
    return routes.find((route: IRoute) => isRouteHasPath(route, currentPath)) || { path: '/error', page: errorPage };
  }

  route() {
    if (this.previousPage && this.previousPage.unmount) this.previousPage.unmount();
    let currentPath = getLocationPath();

    if (productPageURLRegExp.test(currentPath)) {
      const productId = currentPath.split('/').pop();
      currentPath = checkIsProductById(productId) ? currentPath.replace(productId, '') : '/error';
    } else if (authPagesURLRegExp.test(currentPath) && storage.checkIsUserLogged()) {
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

  init() {
    this.mainContainer = document.querySelector('.app');
    window.addEventListener('hashchange', this.route);
    this.route();
  }
}

export default new Router();
