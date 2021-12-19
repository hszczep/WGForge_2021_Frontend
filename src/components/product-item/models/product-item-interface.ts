import { ProductPrice } from '../../../models/product-item.model';

interface IProductItemComponent {
  id: string;
  tier?: number;
  type: string | Array<string>;
  name: string;
  price: ProductPrice;
  nation?: string;
  images: Array<string>;
  tank_type?: string;
  linkToDescription: string;
  discount_show_type: string;
  discount: number;
  price_discount: number;
  flag?: string;
  isFavorite?: boolean;
}

export default IProductItemComponent;
