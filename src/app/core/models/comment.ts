// src/app/core/models/comment.model.ts
import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  user_id: number;
  user?: User;
  film_id?: number;
  product_id?: number;
}

export interface RegisterComment {
  content: string;
  film_id?: number;
  product_id?: number;
}