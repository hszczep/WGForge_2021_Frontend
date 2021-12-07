import './scss/footer.styles.scss';

class FooterComponent {
  constructor() {
    this.render = this.render.bind(this);
  }

  render() {
    return `
      <footer class="footer">
        <div class="footer-info">
          <svg class="forge-logo">
            <use xlink:href="assets/images/sprite.svg#forgeLogo"></use>
          </svg>
          <p class="create-date">© 2021</p>
          <div class="social-networks-block">
            <a href="https://t.me/wgforge" target="_blank">
              <svg class="networks-logo">
                <use xlink:href="assets/images/sprite.svg#telegram"></use>
              </svg>
            </a>
            <a href="https://www.instagram.com/wgforge/" target="_blank">
              <svg class="networks-logo">
                <use xlink:href="assets/images/sprite.svg#instagram"></use>
              </svg>
            </a>
            <a href="https://vk.com/wgforge" target="_blank">
              <svg class="networks-logo">
                <use xlink:href="assets/images/sprite.svg#VK"></use>
              </svg>
            </a>
            <a href="https://web.facebook.com/WGForge" target="_blank">
              <svg class="networks-logo">
                <use xlink:href="./assets/images/sprite.svg#facebook"></use>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}

export default new FooterComponent();
