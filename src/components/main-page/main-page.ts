import './scss/main-page.styles.scss';

class MainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {}

  unmount() {}

  render() {
    return `
      <section class="main-page">
        <header class="main-page__header">
          <nav class="main-page__navigation navigation">
            <a class="main-page__navigation-link navigation-link link" href="#/signin">Signin page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/signup">Signup page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/test">Test page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/error">Error page</a>
          </nav>
        </header>
        <h2 class="main-page-title">It is the Main Page!</h2>
      </section>
    `;
  }
}

export default new MainPageComponent();
