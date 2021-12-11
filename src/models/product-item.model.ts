interface ProductItemInterface {
  type: string;
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
  isFavorite?: boolean;
}

interface ProductPrice {
  code: string;
  amount: string;
}

export default ProductItemInterface;
