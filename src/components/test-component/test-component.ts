// Test import of an asset
import webpackLogo from './assets/images/webpack-logo.svg';

// Test import of a mp3
import successSound from './assets/audio/correct.mp3';

// Test import of a JavaScript module
import { example } from './components/js-module/example';

// Test import of a TypeScript module
import { fetchIP } from './components/fetch-module/fetch-module';

class TestComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    const root: HTMLElement = document.querySelector('#root');

    // Appending to the DOM
    const heading: HTMLHeadingElement = document.createElement('h1');
    heading.textContent = 'Webpack testing...';

    // Appending to the DOM img
    const logo = document.createElement('img');
    logo.src = webpackLogo;

    const heading2 = document.createElement('h1');
    heading2.textContent = example();

    // Test a background image url in CSS
    const imageBackground = document.createElement('div');
    imageBackground.classList.add('image');

    // Test a public folder asset
    const imagePublic = document.createElement('img');
    imagePublic.src = './assets/images/loader_icon.gif';

    root.append(logo, heading2, imageBackground);
    root.insertAdjacentElement('afterend', imagePublic);

    const ipContainer = document.querySelector('#ipInfo');

    // Test an async(fetch) operation
    this.renderContainer(ipContainer, fetchIP);

    const successButton = document.querySelector('#button');
    const audioSuccess = new Audio(successSound);

    successButton.addEventListener('click', () => audioSuccess.play());
  }

  async renderContainer(container: Element, fetchToAPIMethod: () => Promise<unknown>) {
    const data = await fetchToAPIMethod();
    container.insertAdjacentHTML(
      'afterbegin',
      `<span class="bold red">My IP data:</span> ${JSON.stringify(data)}`,
    );
  }

  render() {
    return `
      <div class="wrapper">
        <div class="navigation">
          <a class="navigation-link link" href="#/">Main page</a>
          <a class="navigation-link link" href="#/error">Error page</a>
        </div>
        <p>It is the Test Page!</p>
        <img src="assets/images/loader_icon.gif">
        <div id="root"></div>
        <button id="button">Play sound</button>
        <div id="ipInfo"></div>
      </div>
      `;
  }
}

export default new TestComponent();
