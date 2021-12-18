import ProductItemInterface from '../../../models/product-item.model';
import detailsRender from './product.details';

class AdminProductItem {
  id: string;
  name: string;
  base_price: number;
  images: Array<string>;
  size: string;
  discount: number;
  price_discount: string;
  card: HTMLElement;
  item: ProductItemInterface;
  title: HTMLElement;
  order: number;
  constructor(item: ProductItemInterface) {
    this.item = item;
    this.id = item.id;
    this.name = item.name;
    this.base_price = item.base_price;
    this.images = item.images;
    this.size = 'single';
    this.discount = item.discount;
    this.card = this.createCard();
    this.title = this.card.querySelector('.basic-information');
    this.order = item.has_order;

    this.render = this.render.bind(this);
    this.createCard = this.createCard.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);

    this.title.addEventListener('click', this.showDetails);
  }

  showDetails() {
    this.card.classList.add('active-card');
    this.card.append(detailsRender(this.item));
    this.title.removeEventListener('click', this.showDetails);
    this.title.addEventListener('click', this.hideDetails);
  }

  hideDetails() {
    this.card.classList.remove('active-card');
    this.card.lastChild.remove();
    this.title.removeEventListener('click', this.hideDetails);
    this.title.addEventListener('click', this.showDetails);
  }

  createCard() {
    const card = document.createElement('article');
    card.classList.add('item-card');
    card.dataset.id = this.id;
    const content = `
                <div class="basic-information">
                <div class="item-info item-name">${this.name}</div>
                <div class="item-info">${this.order ? this.order : false}</div>
                <div class="item-info">${this.base_price}</div>
                <div class="item-info">${this.discount}</div>
                <div class="item-info">${this.size}</div>
                <div class="item-info item-img">
                  <img
                    src="${this.images[0]}"
                    alt="${this.name}"
                  />
                </div>
                <div class="item-info">
                <svg class="delete-button">
                  <use xlink:href="assets/images/sprite.svg#close"></use>
                </svg>
              </div>
    `;
    card.innerHTML = content;
    return card;
  }

  render(): HTMLElement {
    return this.card;
  }
}

export default AdminProductItem;
