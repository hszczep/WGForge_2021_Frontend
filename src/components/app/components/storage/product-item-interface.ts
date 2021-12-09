interface ProductItemIinterface {
  id: string;
  tier?: number;
  type: string;
  name: string;
  price: number;
  nation?: string;
  images: Array<string>;
  tank_type?: string;
  discount: number;
  price_discount: number;
  flag?: string;
}

export default ProductItemIinterface;
