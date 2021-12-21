import headerComponent from '../../../header/header';
import footerComponent from '../../../footer/footer';
import { Spinner } from '../../../spinner/spinner';

import authUserService from '../../../../services/auth-user.service';
import storage from '../storage/storage';

class Controller {
  #elements: { [key: string]: HTMLElement } = null;
  spinner: Spinner = null;
  appContainer: HTMLElement = null;

  constructor() {
    this.#elements = {
      appContainer: document.querySelector('.app-field'),
    };

    this.#spinnerInit();
  }

  #renderHeader(): void {
    this.#elements.appContainer.insertAdjacentHTML('afterbegin', headerComponent.render());
  }

  #renderFooter(): void {
    this.#elements.appContainer.insertAdjacentHTML('beforeend', footerComponent.render());
  }

  #spinnerInit(): void {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }

  async init(): Promise<void> {
    this.#renderHeader();
    headerComponent.init();

    this.#renderFooter();

    await authUserService.updateUserState();
    if (storage.checkIsUserAdmin()) window.location.hash = '#/admin';

    headerComponent.updateHeaderForCurrentUserState();
  }
}

export default new Controller();
