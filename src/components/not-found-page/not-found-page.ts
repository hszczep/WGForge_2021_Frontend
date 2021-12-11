import './scss/not-found-page.styles.scss';

class NotFoundPageComponent {
  init() {}

  render() {
    let errorText = '';
    for (let i = 0; i < 300; i++) {
      errorText += '404 page, not found. Error! ';
    }

    return `
    <div class="error-block">
      <p class="error-img__text">${errorText}</p>
    </div>
    `;
  }
}

export default new NotFoundPageComponent();
