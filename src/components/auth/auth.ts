class AuthPageComponent {
  #isRegistration = true;

  render(): string {
    return `
      <div class="auth-field">
        <form>
          <fieldset class="auth-form">
            <legend>${this.#isRegistration ? 'Registration' : 'Log in to account'}</legend> 
            <label class="auth-form__input-name">
              Email:
              <input type="text" class="auth-form__input correct-input-data" />
            </label>
            <p class="validator-text" id="incorrect-email">* Неверный email.</p>
            <label class="auth-form__input-name">
              Password:
              <input type="password" class="auth-form__input incorrect-input-data" />
            </label>
            <p class="validator-text" id="incorrect-password">* Неверный пароль.</p>
            <p class="validator-text" id="incorrect-data">* Неверный email или пароль.</p>
            <button class="auth-form__button">${this.#isRegistration ? 'Sign up' : 'Sign in'}</button>
          </fieldset>
        </form>
      </div>
    `;
  }
}

const signupPageComponent = new AuthPageComponent();

export { signupPageComponent };
