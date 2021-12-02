class ProductItemComponent {
  id : string;
  tier: number;
  type: string;
  name: string;
  price: number;
  nation: string;
  images: Array<string>;
  tankType: string;
  size: string;
  linkToDiscription: string;
  discount: number;
  flag: string;
  constructor({tier, type, name, price, nation, images, tank_type, id}:{tier:number, type:string, name:string, price:number, nation:string, images:Array<string>, tank_type:string, id:string}) {
    this.id = id;
    this.tier = tier; // tier tank, for render convert expample "4" -> "IV"
    this.type = type; //tank, gold or premium
    this.tankType = tank_type.toLowerCase(); //ligth, medium, haevy
    console.log(this.tankType)
    this.name = name; // shor name tank
    this.price = price; //default price $
    this.nation = nation; //country 
    this.flag = `flag__${this.nation}`; // for icon flag
    this.images = images; // link image
    this.size = 'single'; // add to JSON
    this.linkToDiscription = `#/product/${this.id}`; // add to JSON
    this.discount = 0; // add to JSON;

    this.render = this.render.bind(this);
  }

  convertToRomane(number:number):string {
    let map = ['','I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return map[number];
  }

  render() {
    let TankNameInfo;
    if (this.type === 'machinery') {
      TankNameInfo = `
                  <span class="flag ${this.flag}"></span>
                  <span class="tank-type tank-type__${this.tankType}"></span>
                  <span class="level">${this.convertToRomane(this.tier)}</span>
                  <span class="item-name">${this.name}</span>
      `;
    } else {
      TankNameInfo = `
                  <span class="item-name">${this.name}</span>
      `;
    }
    return `
          <article class="card card__${this.size}" id="${this.id}">
            <a href="${this.linkToDiscription}" class="card-info">
              <img class="card-img" src="${this.images[0]}" alt="${this.name}" />
              <div class="card-specifications">
                <p class="discount">${this.discount || ''}</p>
                <h2 class="item-text">
                  ${TankNameInfo}
                </h2>
                <p class="price">$ ${this.price}</p>
                <p class="price price-discount">${this.discount ? this.price : ''}</p>
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
