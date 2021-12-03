import storage from '../storage/storage';
import { Spinner } from '../../../spinner/spinner';

import authUserService from '../../../../services/auth-user.service';

class Controller {
  spinner: Spinner = null;

  authBlock: HTMLElement;

  constructor() {
    this.logoutButtonClickHandler = this.logoutButtonClickHandler.bind(this);

    this.authBlock = document.querySelector('.authentication');
  }

  #spinnerInit() {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }

  logoutButtonClickHandler(): void {
    authUserService.logOutUser();
    this.rerenderAuthBlock();
  }

  rerenderAuthBlock(): void {
    this.authBlock.innerHTML = '';

    if (storage.checkIsUserLogged()) {
      this.authBlock.insertAdjacentHTML(
        'afterbegin',
        `<span>${storage.getUserState().credentials.name}</span>
        <button class="authentication-logout-button">logout</button>`
      );

      this.authBlock
        .querySelector('.authentication-logout-button')
        .addEventListener('click', this.logoutButtonClickHandler);

      return;
    }

    this.authBlock.insertAdjacentHTML(
      'afterbegin',
      `<a href="#/signin">Login</a><span> or</span>
      <a href="#/signup">Create account</a>`
    );
  }

  async init() {
    this.#spinnerInit();

    await authUserService.updateUserState();
    if (storage.checkIsUserLogged()) this.rerenderAuthBlock();
  }
}

export default new Controller();
