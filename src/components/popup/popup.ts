import './scss/popup.styles.scss';

class Popup {
  #closeButton: HTMLElement = null;
  #popup: HTMLElement = null;

  constructor() {
    this.closePopupButtonHandler = this.closePopupButtonHandler.bind(this);
  }

  #create(message = 'Error message!', type = 'Error'): HTMLElement {
    const popup = document.createElement('div');
    popup.className = 'popup-layout';
    popup.innerHTML = `
      <div class="popup">
        <header class="popup__header">
          <h4>${type}</h4>
          <button class="popup__close-button">×</button>
        </header>
        <p class="popup-body__text">${message}</p>
      </div>`;

    return popup;
  }

  closePopupButtonHandler(): void {
    this.#closeButton.removeEventListener('click', this.closePopupButtonHandler);
    document.body.removeChild(this.#popup);

    this.#popup = null;
    this.#closeButton = null;
  }

  open(message: string, type = 'Error'): void {
    this.#popup = this.#create(message, type);
    this.#closeButton = this.#popup.querySelector('.popup__close-button');
    document.body.appendChild(this.#popup);
    this.#closeButton.addEventListener('click', this.closePopupButtonHandler);
  }
}

export default new Popup();
