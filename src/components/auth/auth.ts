import authUserService from '../../services/auth-user.service';
import { IUserCredentials } from '../../models/user.model';

class AuthPageComponent {
  // in signup page #isRegistration = true (default);
  // in signin page #isRegistration = false;
  #isRegistration = true;
  #elements: { [key: string]: HTMLInputElement | HTMLFormElement } = null;

  constructor(isRegistration = true) {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);

    this.authFormSubmitHandler = this.authFormSubmitHandler.bind(this);
    this.logoutButtonClickHandler = this.logoutButtonClickHandler.bind(this);

    this.#isRegistration = isRegistration;
  }

  #getUserCredentias(): IUserCredentials {
    return {
      email: this.#elements.emailInput.value,
      password: this.#elements.passwordInput.value,
    };
  }

  authFormSubmitHandler(event: Event): void {
    event.preventDefault();

    const userCredetials: IUserCredentials = this.#getUserCredentias();

    authUserService
      .loginUser(this.#isRegistration, userCredetials)
      .then((data) => {
        console.log(data);
      });
  }

  logoutButtonClickHandler() {
    authUserService.logOutUser();
  }

  init(): void {
    this.#elements = {
      emailInput: document.querySelector('#js-inputEmail'),
      passwordInput: document.querySelector('#js-inputPassword'),
      authForm: document.querySelector('#js-authForm'),
      logoutButton: document.querySelector('#js-logOutBtn'),
    }

    this.#elements.authForm.addEventListener('submit', this.authFormSubmitHandler);
    this.#elements.logoutButton.addEventListener('click', this.logoutButtonClickHandler);
  }

  unmount() {
    this.#elements.authForm.removeEventListener('submit', this.authFormSubmitHandler);
  }

  render(): string {
    return `
      <section class="main-page">
        <header class="main-page__header">
          <nav class="main-page__navigation navigation">
            <a class="main-page__navigation-link navigation-link link" href="#/">Main page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/signin">Signin page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/signup">Signup page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/test">Test page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/error">Error page</a>
          </nav>
        </header>
        <h2 class="main-page-title">It is ${this.#isRegistration ? 'Signup' : 'Signin'} Page!</h2>
      </section>

      <form name="auth" class="login" id="js-authForm">
        <div class="login__title">Welcome to ${this.#isRegistration ? 'registration' : 'login'} page</div>
          
        <div>
          <input type="email" id="js-inputEmail" class="login__input form-control" 
            placeholder="EMAIL" maxlength="30" autocomplete="off">
        </div>
        <div>
          <input type="password" id="js-inputPassword" class="login__input form-control" 
            placeholder="PASSWORD" maxlength="30" autocomplete="off">
        </div>
        <button class="login__send login-mb-3" type="submit" id="js-loginCreateBtn">
          ${this.#isRegistration ? 'signup' : 'signin'}
        </button>
        <button class="login__send login-mb-3" type="button" id="js-logOutBtn">
          logOut
        </button>
        <div id="js-loginCreateInfo" class="login__info login-mb-3"></div>   
      </form> 
    `;
  }
}

const signinPageComponent = new AuthPageComponent(false);
const signupPageComponent = new AuthPageComponent();

export { signinPageComponent, signupPageComponent };
