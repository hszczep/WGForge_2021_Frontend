export interface ProductModel {
  type: Array<string>;
  name: string;
  base_price: number;
  discount: number;
  base_price_discount: number;
  discount_show_type: string;
  tier?: number;
  nation?: string;
  tank_type?: string;
  id: string;
  images: Array<string>;
  details: string;
  order?: number;
}
