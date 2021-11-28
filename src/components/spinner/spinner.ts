import './scss/spinner.scss';

const CLASS_NAMES = {
  MAIN: 'spinner',
  HIDDEN: 'display-none',
};

export class Spinner {
  container: HTMLElement = null;
  additionalClass: string;
  spinner: HTMLElement = null;

  constructor(container: HTMLElement, additionalClass = '') {
    this.container = container;
    this.additionalClass = additionalClass;
    this.spinner = null;

    this.#create();
  }

  #create() {
    this.spinner = document.createElement('div');
    this.spinner.className = `${CLASS_NAMES.MAIN} ${CLASS_NAMES.HIDDEN} ${this.additionalClass}`;
    this.spinner.insertAdjacentHTML(
      'beforeend',
      `
        <div class="spinner__gear">
          <div class="spinner__inner">
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <span class="spinner__description">загрузка...</span>
      `,
    );
  }

  render() {
    if (this.container && this.spinner) this.container.append(this.spinner);
    this.show();
  }

  remove() {
    if (this.spinner) this.spinner.remove();
  }

  show() {
    if (this.spinner) this.spinner.classList.remove(CLASS_NAMES.HIDDEN);
  }

  hide() {
    if (this.spinner) this.spinner.classList.add(CLASS_NAMES.HIDDEN);
  }

  toggle() {
    if (this.spinner) this.spinner.classList.toggle(CLASS_NAMES.HIDDEN);
  }

  init() {
    this.render();
    this.hide();
  }
}
