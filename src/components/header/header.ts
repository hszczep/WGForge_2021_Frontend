import './scss/header.styles.scss';

class HeaderComponent {
  constructor() {
    this.render = this.render.bind(this);
  }

  render() {
    return `
      <header class="header">
        <h1 class="visually-hidden">Word of tanks premium shop</h1>
        <nav class="nav">
          <div class="logo">
            <a href="#">
              <svg class="logo-icon">
                <use xlink:href="assets/images/sprite.svg#WGLogo"></use>
              </svg>
              Premium shop
            </a>
          </div>
          <div class="nav-menu">
            <a href="#" id="wish-list">
              Wishlist
              <span id="wish-list__quantity" class="quantity">(2)</span>
            </a>
            <a href="#" id="cart">
              Shopping cart
              <span id="cart__quantity" class="quantity">(5)</span>
            </a>
            <div class="authentication">
              <a class="authentication-signin" href="#/signin">Login</a><span> or</span>
              <a class="authentication-signup" href="#/signup">Create account</a>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

export default new HeaderComponent();
