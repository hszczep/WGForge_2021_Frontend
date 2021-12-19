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
    this.card.append(detailsRender());
    this.title.removeEventListener('click', this.showDetails);
    const cross = this.card.querySelector('.cancel-btn');
    cross.addEventListener('click', this.hideDetails);
    this.initDetails();
  }

  initDetails() {
    const priceInput = this.card.querySelector('.input-price') as HTMLInputElement;
    const dicountPriceInput = this.card.querySelector('.input-discount_price') as HTMLInputElement;
    const dicountInput = this.card.querySelector('.input-discout') as HTMLInputElement;
    const showDiscount = this.card.querySelector('.show-discount') as HTMLInputElement;
    const nameInput = this.card.querySelector('.input-name') as HTMLInputElement;
    const cardSize = this.card.querySelector('.card-size');
    const orderInput = this.card.querySelector('.input-order') as HTMLInputElement;
    const typeInputs = this.card.querySelector('.category-block').querySelectorAll('input');
    const descriptionInput = this.card.querySelector('.description-input') as HTMLInputElement;
    const imagesInput = this.card.querySelector('.images-input') as HTMLInputElement;

    const tankInfo = this.card.querySelector('.tank-info') as HTMLElement;
    const [tankNation, tankType, tankTier] = tankInfo.children;
    const vehicle = 'vehicle';

    priceInput.value = this.item.base_price.toString();
    dicountPriceInput.value = this.item.base_price_discount.toString();
    dicountInput.value = this.item.discount.toString();
    nameInput.value = this.item.name;
    descriptionInput.value = this.item.details;
    imagesInput.value = this.item.images[0] as string;
    orderInput.value = this.item.has_order ? this.item.has_order.toString() : '0';

    cardSize.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
      if (this.item.double_size) {
        const elem = element;
        elem.selected = true;
      }
    });
    showDiscount.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
      if (element.innerHTML.toLocaleLowerCase() === this.item.discount_show_type) {
        const elem = element;
        elem.selected = true;
      }
    });
    typeInputs.forEach((element: HTMLInputElement) => {
      if (this.item.type.includes(element.dataset.type)) {
        const elem = element;
        elem.checked = true;
      }
    });
    if (this.item.nation && this.item.tank_type && this.item.tier) {
      tankNation.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.dataset.nation === this.item.nation) {
          const elem = element;
          elem.selected = true;
        }
      });
      tankType.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.dataset.type === this.item.tank_type.toLowerCase()) {
          const elem = element;
          elem.selected = true;
        }
      });
      tankTier.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.innerHTML === this.item.tier.toString()) {
          const elem = element;
          elem.selected = true;
        }
      });
    } else tankInfo.style.display = 'none';

    const vehicleCheckbox = this.card.querySelector(`[data-type=${vehicle}]`) as HTMLInputElement;
    vehicleCheckbox.onchange = () => {
      tankInfo.style.display = vehicleCheckbox.checked ? 'flex' : 'none';
    };
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
