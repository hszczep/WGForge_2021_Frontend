import headerComponent from '../../../header/header';
import footerComponent from '../../../footer/footer';
import storage from '../storage/storage';
import { Spinner } from '../../../spinner/spinner';

import authUserService from '../../../../services/auth-user.service';

class Controller {
  spinner: Spinner = null;

  appContainer: HTMLElement = null;
  authBlock: HTMLElement = null;

  constructor() {
    this.logoutButtonClickHandler = this.logoutButtonClickHandler.bind(this);
    this.appContainer = document.querySelector('.app-field');
  }

  #renderHeader(): void {
    const headerMarkup = headerComponent.render();
    this.appContainer.insertAdjacentHTML('afterbegin', headerMarkup);
  }

  #renderFooter(): void {
    const footerMarkup = footerComponent.render();
    this.appContainer.insertAdjacentHTML('beforeend', footerMarkup);
  }

  #spinnerInit(): void {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }

  logoutButtonClickHandler(): void {
    authUserService.logOutUser();
    this.rerenderAuthBlock();
  }

  rerenderAuthBlock(): void {
    this.authBlock.innerHTML = '';

    const userName = storage.getUserState().credentials.name;

    if (storage.checkIsUserLogged()) {
      this.authBlock.insertAdjacentHTML(
        'afterbegin',
        `<div class="authentication-wrapper">
          <span class="authentication-user-name" title="${userName}">
            ${userName}
          </span>
          <button class="authentication-logout-button">logout</button>
         </div>`
      );

      this.authBlock
        .querySelector('.authentication-logout-button')
        .addEventListener('click', this.logoutButtonClickHandler);

      return;
    }

    this.authBlock.insertAdjacentHTML(
      'afterbegin',
      `<a class="authentication-signin" href="#/signin">Login</a><span> or</span>
       <a class="authentication-signup" href="#/signup">Create account</a>`
    );
  }

  async init(): Promise<void> {
    this.#renderHeader();
    this.#renderFooter();

    this.authBlock = document.querySelector('.authentication');

    this.#spinnerInit();

    this.spinner.show();
    await authUserService.updateUserState();
    this.spinner.hide();

    if (storage.checkIsUserLogged()) {
      this.rerenderAuthBlock();
      window.location.hash = '#';
    }
  }
}

export default new Controller();
