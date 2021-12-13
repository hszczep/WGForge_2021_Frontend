import './scss/auth.styles.scss';

import appController from '../app/components/controller/app.controller';
import headerComponent from '../header/header';
import storage from '../app/components/storage/storage';

import authUserService from '../../services/auth-user.service';

import { capitalizeFirstLetter } from '../../common/common.helper';
import { VALIDATION_ERRORS_MESSAGES, VALIDATION_REG_EXPS } from './common/auth.constants';
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

  #isValidEmail(email: string): boolean {
    return Boolean(email.match(VALIDATION_REG_EXPS.EMAIL));
  }

  #isValidPassword(password: string): boolean {
    return Boolean(password.match(VALIDATION_REG_EXPS.PASSWORD));
  }

  #clearApiErrorMessage(): void {
    this.#elements.apiErrorMessage.innerText = '';
  }

  #showApiErrorMessage(apiErrorMessage: string): void {
    this.#elements.apiErrorMessage.innerText = capitalizeFirstLetter(apiErrorMessage);
  }

  #clearValidationMessages(): void {
    this.#elements.validationMessagesEmail.innerText = '';
    this.#elements.validationMessagesPassword.innerText = '';
  }

  #setDefaultValidationState(): void {
    this.#clearValidationMessages();
    this.#elements.emailInput.classList.remove('incorrect-input-data', 'correct-input-data');
    this.#elements.passwordInput.classList.remove('incorrect-input-data', 'correct-input-data');
  }

  #validateFormInputs(): boolean {
    this.#setDefaultValidationState();
    let isFormInputValid = true;

    if (!this.#isValidEmail(this.#elements.emailInput.value)) {
      this.#elements.emailInput.classList.add('incorrect-input-data');
      this.#elements.validationMessagesEmail.innerText = VALIDATION_ERRORS_MESSAGES.EMAIL;
      isFormInputValid = false;
    } else this.#elements.emailInput.classList.add('correct-input-data');

    if (!this.#isValidPassword(this.#elements.passwordInput.value)) {
      this.#elements.passwordInput.classList.add('incorrect-input-data');
      this.#elements.validationMessagesPassword.innerText = VALIDATION_ERRORS_MESSAGES.PASSWORD;
      isFormInputValid = false;
    } else this.#elements.passwordInput.classList.add('correct-input-data');

    return isFormInputValid;
  }

  init(isRegistration = true): void {
    this.#isRegistration = isRegistration;

    this.#elements = {
      authForm: document.querySelector('.auth-field-form'),
      emailInput: document.querySelector('.auth-form__input-email'),
      passwordInput: document.querySelector('.auth-form__input-password'),
      validationMessagesEmail: document.querySelector('.incorrect-email'),
      validationMessagesPassword: document.querySelector('.incorrect-password'),
      apiErrorMessage: document.querySelector('.incorrect-data'),
    };

    this.#elements.authForm.addEventListener('submit', this.authFormSubmitHandler);
  }

  unmount(): void {
    this.#elements.authForm.removeEventListener('submit', this.authFormSubmitHandler);
  }

  authFormSubmitHandler(event: Event): void {
    event.preventDefault();

    this.#clearApiErrorMessage();
    if (!this.#validateFormInputs()) return;

    const userCredetials: IUserCredentials = this.#getUserCredentias();

    appController.spinner.show();
    authUserService
      .loginUser(this.#isRegistration, userCredetials)
      .then((response) => {
        if (response) {
          headerComponent.updateHeaderForCurrentUserState();
          window.location.hash = storage.checkIsUserAdmin() ? '#/admin' : '#';
        }
      })
      .catch((error: Error) => {
        this.#showApiErrorMessage(error.message);
      })
      .finally(() => appController.spinner.hide());
  }

  render(isRegistration = true): string {
    // for testing email: test@mail.by  password: 12345 or create your own account
    return `
      <div class="auth-field">
        <form class="auth-field-form">
          <fieldset class="auth-form">
            <legend>${isRegistration ? 'Registration' : 'Log in to account'}</legend> 
            <label class="auth-form__input-name">
              Email:
              <input type="text" class="auth-form__input auth-form__input-email" />
            </label>
            <p class="validator-text incorrect-email"></p>
            <label class="auth-form__input-name">
              Password:
              <input type="password" class="auth-form__input auth-form__input-password" />
            </label>
            <p class="validator-text incorrect-password"></p>
            <p class="api-validator-text validator-text incorrect-data"></p>
            <button class="auth-form__button">${isRegistration ? 'Sign up' : 'Sign in'}</button>
          </fieldset>
        </form>
      </div>`;
  }
}

export default new AuthPageComponent();
