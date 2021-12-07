export interface IProductItem {
  name: string;
  type: string;
  details?: string;
  images: string[];
  price: number;
  discount: number;
  price_discount: number;
  tier?: number;
  nation?: string;
  tank_type?: string;
  id: string;
}
