export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  total: number;
}

export interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}