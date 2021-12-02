import { errorPage } from './pages/error-page';

import appController from '../controller/app.controller';
import routes from './routes/routes';

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

  async route() {
    if (this.previousPage && this.previousPage.unmount) this.previousPage.unmount();

    const currentPath = getLocationPath();

    if (/\/product\//.test(currentPath)){
      const currentGlobalPath = currentPath.match(/\/product\//)[0];

      const { page } = this.findPageByPath(currentGlobalPath);
      
      this.previousPage = page;
      appController.spinner.show();
  
      this.mainContainer.innerHTML = '';
      const pageMarkup: string = await page.render();
      appController.spinner.hide();
  
      this.mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
      if (page.init) page.init();

    } else {
      const { page } = this.findPageByPath(currentPath);
    
      this.previousPage = page;
  
      appController.spinner.show();
  
      this.mainContainer.innerHTML = '';
      const pageMarkup: string = await page.render();
  
      appController.spinner.hide();
  
      this.mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
      if (page.init) page.init();
    }
  }

  init() {
    this.mainContainer = document.querySelector('.app');
    window.addEventListener('hashchange', this.route);
    this.route();
  }
}

export default new Router();
