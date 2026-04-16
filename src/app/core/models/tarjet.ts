// src/app/core/models/tarjet.model.ts
export interface Tarjet {
  id: number;
  number: string;
  money: number;
  expiry: Date;
}

export interface RegisterTarjet {
  number: string;
  money: number;
  expiry: Date;
}

export interface PaymentRequest {
  tarjetId: number;
  amount: number;
}