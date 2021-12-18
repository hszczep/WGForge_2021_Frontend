export interface ProductItemInterface {
  type: Array<string>;
  name: string;
  price: ProductPrice;
  discount: number;
  price_discount: number;
  tier?: number;
  nation?: string;
  tank_type?: string;
  id: string;
  images: Array<string>;
  details: string;
  isFavorite: boolean;
  order?: number;
  discount_show_type: string;
}

export interface ProductPrice {
  code: string;
  amount: number;
}


