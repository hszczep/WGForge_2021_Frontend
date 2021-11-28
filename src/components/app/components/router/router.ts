import { errorPage } from './pages/error-page';

import routes from './routes/routes';

import { getLocationPath, isRouteHasPath } from './common/router.helper';

import { IPage } from './models/page.model';
import { IRoute } from './models/route.model';

class Router {
  mainContainer: HTMLElement = null;
  previousPage: IPage = null;

  constructor() {
    this.rout = this.rout.bind(this);
  }

  findPageByPath(currentPath: string) {
    return routes
      .find((route: IRoute) => isRouteHasPath(route, currentPath))
        || { path: '/error', page: errorPage };
  }

  rout() {
    if (this.previousPage && this.previousPage.unmount) this.previousPage.unmount();

    const currentPath = getLocationPath();
    const { page } = this.findPageByPath(currentPath);
    this.previousPage = page;

    this.mainContainer.innerHTML = '';
    const pageMarkup: string = page.render();

    this.mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
    if (page.init) page.init();
  }

  init() {
    this.mainContainer = document.querySelector('.app');
    window.addEventListener('hashchange', this.rout);
    this.rout();
  }
}

export default new Router();
