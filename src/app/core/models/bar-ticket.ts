import { User } from './user';

export interface BarTicket {
  id: number;
  dateTicket: Date;
  user_id: number;
  user?: User;
  products?: ProductHasBarTicket[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
}

export interface ProductHasBarTicket {
  product_id: number;
  bar_ticket_id: number;
  quantity: number;
  product?: Product;
}

export interface BarPurchaseRequest {
  products: { productId: number; quantity: number }[];
  tarjetId: number;
  totalAmount: number;
}

export interface RegisterProduct {
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
}