import './scss/not-found-page.styles.scss';

class NotFoundPageComponent {
  init() {}

  render() {
    const errorText = '404 page, not found. Error!'.repeat(300);

    return `
    <div class="error-block">
      <p class="error-img__text">${errorText}</p>
    </div>
    `;
  }
}

export default new NotFoundPageComponent();
