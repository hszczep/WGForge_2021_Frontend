import { ProductItemInterface } from '../../../models/product-item.model';
import detailsRender from './product.details';
import AdminService from '../../../services/admin.service';
import popup from '../../popup/popup';
import storage from '../../app/components/storage/storage';
import AdminPageComponent from '../admin'
import { ProductModel } from '../../../services/models/productModel';

class AdminProductItem {
  id: string;
  name: string;
  base_price: number;
  images: Array<string>;
  discount: number;
  price_discount: string;
  card: HTMLElement;
  item: ProductItemInterface;
  title: HTMLElement;
  order: number;
  form: HTMLFormElement;
  priceInput: HTMLInputElement;
  discountPriceInput: HTMLInputElement;
  discountInput: HTMLInputElement
  constructor(item: ProductItemInterface) {
    this.item = item;
    this.id = item.id;
    this.name = item.name;
    this.base_price = item.base_price;
    this.images = item.images;
    this.discount = item.discount;
    this.order = item.order;
    this.deleteProduct = this.deleteProduct.bind(this);
    this.card = this.createCard();
    this.title = this.card.querySelector('.basic-information');

    this.render = this.render.bind(this);
    this.createCard = this.createCard.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.calculateDiscount = this.calculateDiscount.bind(this);
    this.title.addEventListener('click', this.showDetails);
  }

  submitForm(e: SubmitEvent){
    e.preventDefault();
    const formData = new FormData(this.form);
    const product =  {...Object.fromEntries(formData),
      type: formData.getAll('type'),
      images: formData.get('images').toString().split(/\r\n/)
    } as ProductModel;
    AdminService.updateProduct(product.id, product)
      .then(()=>{
        storage.init().then(()=>{
          AdminPageComponent.init();
        })
      }).catch(err=>{
        popup.open(err.message);
      })
  }
  calculateDiscount(){
    const price = Number(this.priceInput.value);
    const discountPrice = Number(this.discountPriceInput.value);
    this.discountInput.value = Math.floor(100 - (discountPrice/price) *100).toString();
  }
  showDetails(event: Event) {
    if (!(event.target as HTMLElement).classList.contains('delete-button')) {
      this.card.classList.add('active-card');
      this.card.append(detailsRender());
      this.title.removeEventListener('click', this.showDetails);
      const cross = this.card.querySelector('.cancel-btn');
      cross.addEventListener('click', this.hideDetails);
      this.initDetails();
    }
  }

  initDetails() {
    this.priceInput = this.card.querySelector('.input-price') as HTMLInputElement;
    this.discountPriceInput = this.card.querySelector('.input-discount_price') as HTMLInputElement;
    this.discountInput = this.card.querySelector('.input-discount') as HTMLInputElement;
    const idInput = this.card.querySelector('.input-id') as HTMLInputElement;
    const showDiscount = this.card.querySelector('.show-discount') as HTMLInputElement;
    const nameInput = this.card.querySelector('.input-name') as HTMLInputElement;
    const orderInput = this.card.querySelector('.input-order') as HTMLInputElement;
    const typeInputs = this.card.querySelector('.category-block').querySelectorAll('input');
    const descriptionInput = this.card.querySelector('.description-input') as HTMLInputElement;
    const imagesInput = this.card.querySelector('.images-input') as HTMLInputElement;
    const tankInputs = this.card.querySelectorAll('.tank-select')

    const tankInfo = this.card.querySelector('.tank-info') as HTMLElement;
    const [tankNation, tankType, tankTier] = tankInfo.children;
    const vehicle = 'vehicle';
    idInput.value = this.item.id;
    this.priceInput.value = this.item.base_price.toString();
    this.discountPriceInput.value = this.item.base_price_discount.toString();
    this.discountInput.value = this.item.discount.toString();
    nameInput.value = this.item.name;
    descriptionInput.value = this.item.details;
    imagesInput.value = this.item.images.join('\r\n');
    orderInput.value = this.item.order ? this.item.order.toString() : '';

    showDiscount.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
      if (element.innerHTML.toLocaleLowerCase() === this.item.discount_show_type) {
        element.selected = true;
      }
    });
    typeInputs.forEach((element: HTMLInputElement) => {
      if (this.item.type.includes(element.dataset.type)) {
        element.checked = true;
      }
    });
    if (this.item.nation && this.item.tank_type && this.item.tier) {
      tankInputs.forEach((el:HTMLInputElement)=>{
        el.disabled = false;
      })
      tankNation.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.dataset.nation === this.item.nation) {
          element.selected = true;
        }
      });
      tankType.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.dataset.type === this.item.tank_type.toLowerCase()) {
          element.selected = true;
        }
      });
      tankTier.querySelectorAll('option').forEach((element: HTMLOptionElement) => {
        if (element.innerHTML === this.item.tier.toString()) {
          element.selected = true;
        }
      });
    } else {
      tankInputs.forEach((el:HTMLInputElement)=>{
        el.disabled = true;
      })
      tankInfo.style.display = 'none';
    }

    const vehicleCheckbox = this.card.querySelector(`[data-type=${vehicle}]`) as HTMLInputElement;
    vehicleCheckbox.onchange = () => {
      tankInfo.style.display = vehicleCheckbox.checked ? 'flex' : 'none';
    };
    this.form = document.querySelector('#product-form');
    this.form.addEventListener('submit', this.submitForm)
    this.priceInput.addEventListener('change', this.calculateDiscount)
    this.discountPriceInput.addEventListener('change', this.calculateDiscount)

  }

  hideDetails() {
    this.card.classList.remove('active-card');
    this.card.lastChild.remove();
    this.title.removeEventListener('click', this.hideDetails);
    this.title.addEventListener('click', this.showDetails);
  }

  deleteProduct(){
    const spiner = document.querySelector('.spinner') as HTMLElement;
    spiner.style.display = 'flex';
    AdminService.deleteProduct(this.id)
      .then(res => {
        storage.init().then(() => {
          AdminPageComponent.init();
          spiner.style.display = 'none';
        });
      }).catch(err => {
        popup.open(err.message);
      });
  }

  createCard() {
    const card = document.createElement('article');
    card.classList.add('item-card');
    card.dataset.id = this.id;
    card.innerHTML = `
                <div class="basic-information">
                <div class="item-info item-name">${this.name}</div>
                <div class="item-info">${this.order ? this.order : null}</div>
                <div class="item-info">${this.base_price}</div>
                <div class="item-info">${this.discount}</div>
                <div class="item-info item-img">
<!--                 <img src="${this.images[0]}" alt="${this.name}" />-->
                </div>
                <div class="item-info">
                <svg class="delete-button">
                  <use xlink:href="assets/images/sprite.svg#close"></use>
                </svg>
              </div>
    `;
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', this.deleteProduct);
    return card;
  }

  render(): HTMLElement {
    return this.card;
  }
}

export default AdminProductItem;
