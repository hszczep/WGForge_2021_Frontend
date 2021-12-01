import storage from "../app/components/storage/storage";

class ProductPageComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init() {}

  unmount() {}

  render() {
    const productId = window.location.hash.slice(1).toLowerCase().replace(/\/product\//, '');
    const {mainData} = storage;
    const product = mainData.filter(item => item.id === productId)[0];
    
    const {tier, type, name, price, nation, images, tank_type, id}= product;
    
    return `
      <section class="product-page">
        <header class="product-page__header">
          <nav class="main-page__navigation navigation">
            <a class="main-page__navigation-link navigation-link link" href="#/test">Test page</a>
            <a class="main-page__navigation-link navigation-link link" href="#/error">Error page</a>
          </nav>
        </header>
        <h2 class="product-page-title">Product item with id - ${productId}</h2>
      </section>
    `;
  }
}

export default new ProductPageComponent();
