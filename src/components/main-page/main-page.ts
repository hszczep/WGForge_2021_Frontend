import './scss/main-page.styles.scss';

class mainPageComponent {
  constructor() {
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  init() {
    console.log('It is MainPage init()');
  }

  unmount() {
    console.log('It is MainPage unmount()');
  }

  render() {
    console.log('It is MainPage render()');
    return `
      <section class="main-page">
        <header class="main-page__header">
          <nav class="main-page__navigation navigation">
            <a class="main-page__navigation-link navigation-link link" href="#/test">Test page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/error">Error page</a>
          </nav>
        </header>
        <h2 class="main-page-title">It is the Main Page!</h2>
      </section>
    `;
  }
}

export default new mainPageComponent();