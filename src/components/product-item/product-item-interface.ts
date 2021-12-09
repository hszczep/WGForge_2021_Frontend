interface ProductItemComponentInterface {
  id: string;
  tier?: number;
  type: string;
  name: string;
  price: number;
  price_string: string;
  nation?: string;
  images: Array<string>;
  tank_type?: string;
  size?: string;
  linkToDiscription?: string;
  discount: number;
  price_discount: number;
  price_discount_string?: string;
  flag?: string;
}

export default ProductItemComponentInterface;
