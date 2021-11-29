import './scss/product-item.style.scss';

class ProductItemComponent {
  id : string;
  tier: string;
  type: string;
  name: string;
  price: number;
  nation: string;
  images: Array<string>;
  tankType: string;
  size: number;
  linkToDiscription: string;
  discount: number;
  flag: string;
  constructor({tier, type, name, price, nation, images, tank_type, id}) {
    this.id = id;
    this.tier = this.convertToRomane(tier); // convert example "4" -> "IV"
    this.type = type; //tank, gold ir premium
    this.tankType = tank_type; //ligth, medium, haevy
    this.name = name; // shor name tank
    this.price = price; //default price $
    this.nation = nation; //country 
    this.flag = `flag__${this.nation}`; // for icon flag
    this.images = images; // link image
    this.size = 1; // add to JSON
    this.linkToDiscription = `/tank/${this.id}`; // add to JSON
    this.discount = 0; // add to JSON;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  convertToRomane(number:number):string {
    let map = ['','I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return map[number];
}

  init() {}

  render() {
    return `
      <article class="card ${this.size}" id="${(this.id)}">
        <a href="${(this.linkToDiscription)}" class="card-info">
          <img class="card-img" src="${this.images[0]}" alt="${(this.name)}" />
          <div class="card-specifications">
            <p class="discount">${this.discount}</p>
            <h2 class="item-text">
              <span class="flag ${this.flag}"></span>
              <span class="type ${this.tankType}"></span>
              <span class="level">${this.tier}</span>
              <span class="item-name">${this.name}</span>
            </h2>
            <p class="price">${this.price}</p>
          </div>
        </a>
          <button class="like-btn">
            <svg class="like-btn__icon">
              <use xlink:href="assets/images/sprite.svg#like"></use>
            </svg>
          </button>
          <button class="purchase-btn">purchase</button>
      </article>
    `;
  }
}

export default ProductItemComponent;
