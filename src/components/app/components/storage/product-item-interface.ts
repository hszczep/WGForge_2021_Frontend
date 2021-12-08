interface ProductItemInterface {
  tier?: number;
  type: string;
  name: string;
  price: ProductPrice;
  discount: number;
  price_discount: number;
  nation?: string;
  images: Array<string>;
  tank_type?: string;
  id: string;
}

interface ProductPrice {
  code: string;
  amount: string;
}

export default ProductItemInterface;
