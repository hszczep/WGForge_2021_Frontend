import { errorPage } from './pages/error-page';

import appController from '../controller/app.controller';
import routes from './routes/routes';
import storage from '../storage/storage';

import { getLocationPath, isRouteHasPath } from './common/router.helper';

import { IPage } from './models/page.model';
import { IRoute } from './models/route.model';

class Router {
  mainContainer: HTMLElement = null;
  previousPage: IPage = null;

  constructor() {
    this.route = this.route.bind(this);
  }

  findPageByPath(currentPath: string) {
    return routes.find((route: IRoute) => isRouteHasPath(route, currentPath)) || { path: '/error', page: errorPage };
  }

  findProductById(id: string): boolean {
    const productList = storage.products;
    const product = productList.filter((item) => item.id === id)[0];
    return !!product;
  }

  route() {
    if (this.previousPage && this.previousPage.unmount) this.previousPage.unmount();
    let currentPath = getLocationPath();
    const productRegExp = /\/product\//;
    let productId;

    if (productRegExp.test(currentPath)) {
      productId = currentPath.split('/').pop();
      currentPath = this.findProductById(productId) ? currentPath.replace(productId, '') : '/error';
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
