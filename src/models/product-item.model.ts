export interface ProductItemInterface {
  type: Array<string>;
  name: string;
  price: ProductPrice;
  base_price: number;
  discount: number;
  price_discount: number;
  base_price_discount: number;
  discount_show_type: string;
  tier?: number;
  nation?: string;
  tank_type?: string;
  id: string;
  images: Array<string>;
  details: string;
  isFavorite: boolean;
  has_order: number;
  double_size?: boolean;
}

export interface ProductPrice {
  code: string;
  amount: number;
}


