import './scss/header.styles.scss';

import storage from '../app/components/storage/storage';
import authUserService from '../../services/auth-user.service';

class HeaderComponent {
  #elements: { [key: string]: HTMLElement } = null;

  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.logoutButtonClickHandler = this.logoutButtonClickHandler.bind(this);
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

  updateCartCount(): void {
    this.#elements.cartCount.textContent = `(${storage.getCart().length})`;
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

  updateHeaderForCurrentUserState(): void {
    if (storage.checkIsUserLogged()) {
      this.rerenderAuthBlock();
      this.updateFavoritesCount();
      this.updateCartCount();
      this.showSubMenuForAuthorizedUser();
    } else this.#hideSubMenuForUnauthorizedUser();
  }

  init(): void {
    const headerElement = document.querySelector('.header');

    this.#elements = {
      subMenu: headerElement.querySelector('.nav-menu__sub-menu'),
      authBlock: headerElement.querySelector('.authentication'),
      favoritesCount: headerElement.querySelector('#wish-list__quantity'),
      cartCount: headerElement.querySelector('#cart__quantity'),
    };
  }

  render(): string {
    return `
      <header class="header">
        <h1 class="visually-hidden">Word of tanks premium shop</h1>
        <nav class="nav">
          <div class="logo">
            <a href="#">
              <svg class="logo-icon">
                <use xlink:href="assets/images/sprite.svg#WGLogo"></use>
              </svg>
              Premium shop
            </a>
          </div>
          <div class="nav-menu">
            <div class="nav-menu__sub-menu">
              <a href="#/favorites" id="wish-list">
                Wishlist
                <span id="wish-list__quantity" class="quantity"></span>
              </a>
              <a href="#/cart" id="cart">
                Shopping cart
                <span id="cart__quantity" class="quantity"></span>
              </a>
            </div>
            <div class="authentication">
              <a class="authentication-signin" href="#/signin">Login</a><span> or</span>
              <a class="authentication-signup" href="#/signup">Create account</a>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

export default new HeaderComponent();
