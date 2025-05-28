export interface CartItem {
id:number;
  quantity: number;
  cartId: number;
  productId: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    stockAmount: number;
    discountPercentage: number;
    image: string;
    imageFile: string | null;
    categoryName: string | null;
    brandName: string | null;
    categoryId: number;
    brandId: number;
  };
}


