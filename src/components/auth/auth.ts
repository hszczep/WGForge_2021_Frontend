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
      emailInput: document.querySelector('.login__input_email'),
      passwordInput: document.querySelector('.login__input_password'),
      authForm: document.querySelector('.login-form'),
      logoutButton: document.querySelector('.login__button_logout'),
    };

    this.#elements.authForm.addEventListener('submit', this.authFormSubmitHandler);
    this.#elements.logoutButton.addEventListener('click', appController.logoutButtonClickHandler);
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
      <section class="auth-page">
        <h2 class="auth-page-title">It is ${isRegistration ? 'Signup' : 'Signin'} Page!</h2>

        <form class="login-form login" name="login-form">
          <legend class="login__title">Welcome to ${isRegistration ? 'registration' : 'login'} page</legend>
          <label>
            <input class="login__input login__input_email form-control" type="email" 
              placeholder="Enter your email, please" maxlength="30" autocomplete="off">
          </label>
          <div>
            <input type="password" class="login__input login__input_password form-control" 
              placeholder="Enter your password, please" maxlength="30" autocomplete="off">
          </div>
          <button class="login__button login__button_submit" type="submit"">
            ${isRegistration ? 'signup' : 'signin'}
          </button>
          <button class="login__button login__button_logout" type="button">
            logOut
          </button>  
        </form> 
      </section>
    `;
  }
}

export default new AuthPageComponent();
