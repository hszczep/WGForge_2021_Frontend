import './scss/auth.styles.scss';

import appController from '../app/components/controller/app.controller';
import authUserService from '../../services/auth-user.service';
import { IUserCredentials } from '../../models/user.model';

class AuthPageComponent {
  // in signup page #isRegistration = true (default);
  // in signin page #isRegistration = false;
  #isRegistration = true;
  #elements: { [key: string]: HTMLInputElement | HTMLFormElement } = null;

  renderSigninPage: () => string;
  renderSignupPage: () => string;

  initSigninPage: () => void;
  initSignupPage: () => void;

  constructor() {
    this.renderSigninPage = this.render.bind(this, false);
    this.renderSignupPage = this.render.bind(this);
    this.initSigninPage = this.init.bind(this, false);
    this.initSignupPage = this.init.bind(this);
    this.unmount = this.unmount.bind(this);

    this.authFormSubmitHandler = this.authFormSubmitHandler.bind(this);
  }

  #getUserCredentias(): IUserCredentials {
    return {
      email: this.#elements.emailInput.value,
      password: this.#elements.passwordInput.value,
    };
  }

  init(isRegistration = true): void {
    this.#isRegistration = isRegistration;

    this.#elements = {
      authForm: document.querySelector('.auth-form'),
      emailInput: document.querySelector('.auth-form__input-email'),
      passwordInput: document.querySelector('.auth-form__input-password'),
      // logoutButton: document.querySelector('.login__button_logout'),
    };

    this.#elements.authForm.addEventListener('submit', this.authFormSubmitHandler);
    // this.#elements.logoutButton.addEventListener('click', appController.logoutButtonClickHandler);
  }

  unmount(): void {
    this.#elements.authForm.removeEventListener('submit', this.authFormSubmitHandler);
  }

  authFormSubmitHandler(event: Event): void {
    event.preventDefault();

    const userCredetials: IUserCredentials = this.#getUserCredentias();

    appController.spinner.show();
    authUserService
      .loginUser(this.#isRegistration, userCredetials)
      .then((response) => {
        if (response) {
          appController.rerenderAuthBlock();
          window.location.hash = '#';
        }
      })
      .finally(() => appController.spinner.hide());
  }

  render(isRegistration = true): string {
    // test@mail.by  12345
    return `
      <div class="auth-field">
        <form class="auth-form">
          <fieldset class="auth-form__fieldset">
            <legend>${isRegistration ? 'Registration' : 'Log in to account'}</legend> 
            <label class="auth-form__input-name">
              Email:
              <input type="text" class="auth-form__input auth-form__input-email correct-input-data" />
            </label>
            <p class="validator-text" id="incorrect-email">* Неверный email.</p>
            <label class="auth-form__input-name">
              Password:
              <input type="password" class="auth-form__input auth-form__input-password incorrect-input-data" />
            </label>
            <p class="validator-text" id="incorrect-password">* Неверный пароль.</p>
            <p class="validator-text" id="incorrect-data">* Неверный email или пароль.</p>
            <button class="auth-form__button">${isRegistration ? 'Sign up' : 'Sign in'}</button>
          </fieldset>
        </form>
      </div>`;
  }
}

export default new AuthPageComponent();
