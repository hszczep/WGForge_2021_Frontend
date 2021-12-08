import storage from '../app/components/storage/storage';
import convertToRomane from '../../common/common.helper';

class ProductPageComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init() {}

  unmount() {}

  render() {
    const productId = window.location.hash.split('/').pop();
    const productList = storage.mainData;
    const product = productList.filter((item) => item.id === productId)[0];
    const productTank = 'machinery';
    let productNameInfo;

    if (product.type === productTank) {
      productNameInfo = `
                  <span class="flag flag__${product.nation}"></span>
                  <span class="tank-type tank-type__${product.tank_type}"></span>
                  <span class="level">${convertToRomane(product.tier)}</span>
                  <span class="item-name">${product.name}</span>
      `;
    } else {
      productNameInfo = `
                  <span class="item-name">${product.name}</span>
      `;
    }
    return `
          <div class="card__single" id="${product.id}">
              <img class="card-img" src="${product.images[0]}" alt="${product.name}" />
              <div class="card-specifications">
                <p class="discount">${product.discount || ''}</p>
                <h2 class="item-text">
                  ${productNameInfo}
                </h2>
                <p class="price">$ ${product.price}</p>
                <p class="price price-discount">${product.discount ? product.price : ''}</p>
              </div>
            <button class="like-btn">
              <svg class="like-btn__icon">
                <use xlink:href="assets/images/sprite.svg#like"></use>
              </svg>
            </button>
            <button class="purchase-btn">purchase</button>
          </div>
    `;
  }
}

export default new ProductPageComponent();
