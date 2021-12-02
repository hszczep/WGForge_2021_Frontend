import storage from "../app/components/storage/storage";

class ProductPageComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init() {}

  convertToRomane(number:number):string {
    let map = ['','I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return map[number];
  }

  unmount() {}

  render() {
    const productId = window.location.hash.slice(1).toLowerCase().replace(/\/product\//, '');
    const productList = storage.mainData;
    const product = productList.filter(item => item.id === productId)[0];

    let TankNameInfo;
    if (product.type === 'machinery') {
      TankNameInfo = `
                  <span class="flag flag__${product.nation}"></span>
                  <span class="tank-type tank-type__${product.tankType}"></span>
                  <span class="level">${this.convertToRomane(product.tier)}</span>
                  <span class="item-name">${product.name}</span>
      `;
    } else {
      TankNameInfo = `
                  <span class="item-name">${product.name}</span>
      `;
    }
    return `
          <div class="card__single" id="${product.id}">
            <a href="${product.linkToDiscription}" class="card-info">
              <img class="card-img" src="${product.images[0]}" alt="${product.name}" />
              <div class="card-specifications">
                <p class="discount">${product.discount || ''}</p>
                <h2 class="item-text">
                  ${TankNameInfo}
                </h2>
                <p class="price">$ ${product.price}</p>
                <p class="price price-discount">${product.discount ? product.price : ''}</p>
              </div>
            </a>
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
