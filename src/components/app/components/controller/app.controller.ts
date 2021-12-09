import headerComponent from '../../../header/header';
import footerComponent from '../../../footer/footer';
import storage from '../storage/storage';
import { Spinner } from '../../../spinner/spinner';

import authUserService from '../../../../services/auth-user.service';

class Controller {
  spinner: Spinner = null;

  #elements: { [key: string]: HTMLElement } = null;

  appContainer: HTMLElement = null;
  authBlock: HTMLElement = null;

  constructor() {
    this.logoutButtonClickHandler = this.logoutButtonClickHandler.bind(this);

    this.#elements = {
      appContainer: document.querySelector('.app-field'),
    };
  }

  #renderHeader(): void {
    const headerMarkup = headerComponent.render();
    this.#elements.appContainer.insertAdjacentHTML('afterbegin', headerMarkup);
  }

  #renderFooter(): void {
    const footerMarkup = footerComponent.render();
    this.#elements.appContainer.insertAdjacentHTML('beforeend', footerMarkup);
  }

  #spinnerInit(): void {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }

  #hideSubMenuForUnauthorizedUser(): void {
    this.#elements.subMenu.classList.add('hidden');
  }

  showSubMenuForAuthorizedUser(): void {
    this.#elements.subMenu.classList.remove('hidden');
  }

  updateFavoritesCount(): void {
    this.#elements.favoritesCount.textContent = `(${storage.getFavorites().length})`;
  }

  logoutButtonClickHandler(): void {
    authUserService.logOutUser();
    this.#hideSubMenuForUnauthorizedUser();
    this.rerenderAuthBlock();
    if (window.location.hash === '') {
      window.dispatchEvent(new Event('hashchange'));
    } else window.location.hash = '#';
  }

  rerenderAuthBlock(): void {
    this.#elements.authBlock.innerHTML = '';

    const userName = storage.getUserState().credentials.name;

    if (storage.checkIsUserLogged()) {
      this.#elements.authBlock.insertAdjacentHTML(
        'afterbegin',
        `<div class="authentication-wrapper">
          <span class="authentication-user-name" title="${userName}">
            ${userName}
          </span>
          <button class="authentication-logout-button">logout</button>
         </div>`
      );

      this.#elements.authBlock
        .querySelector('.authentication-logout-button')
        .addEventListener('click', this.logoutButtonClickHandler);

      return;
    }

    this.#elements.authBlock.insertAdjacentHTML(
      'afterbegin',
      `<a class="authentication-signin" href="#/signin">Login</a><span> or</span>
       <a class="authentication-signup" href="#/signup">Create account</a>`
    );
  }

  async init(): Promise<void> {
    this.#renderHeader();
    this.#renderFooter();

    this.#elements.subMenu = this.#elements.appContainer.querySelector('.nav-menu__sub-menu');
    this.#elements.authBlock = this.#elements.appContainer.querySelector('.authentication');
    this.#elements.favoritesCount = this.#elements.subMenu.querySelector('#wish-list__quantity');

    this.#spinnerInit();

    this.spinner.show();
    await authUserService.updateUserState();
    this.spinner.hide();

    if (storage.checkIsUserLogged()) {
      this.updateFavoritesCount();
      this.rerenderAuthBlock();
    } else this.#hideSubMenuForUnauthorizedUser();
  }
}

export default new Controller();
