import { Tarjet } from "./tarjet";

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  dni: string;
  userName: string;
  password: string;
  phone: number;
  user_type_id: number;
  userType?: UserType;
  tarjet_id: number | null;
  tarjet?: Tarjet;
}

export interface UserType {
  id: number;
  name: string; // 'client', 'employee', 'admin'
}

export interface RegisterUser {
  name: string;
  lastName: string;
  birthDate: Date;
  userName: string;
  email: string;
  phone: string;
  phonePrefix: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  userType?: string; // para admin cuando crea usuarios
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}