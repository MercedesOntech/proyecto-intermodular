import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjet, RegisterTarjet, ApiResponse, PaymentRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarjetService {
  private apiUrl = `${environment.apiUrl}/tarjets`;

  constructor(private http: HttpClient) {}

  getUserTarjet(userId: number): Observable<ApiResponse<Tarjet>> {
    return this.http.get<ApiResponse<Tarjet>>(`${this.apiUrl}/user/${userId}`);
  }

  registerTarjet(tarjetData: RegisterTarjet, userId: number): Observable<ApiResponse<Tarjet>> {
    return this.http.post<ApiResponse<Tarjet>>(`${this.apiUrl}/register/${userId}`, tarjetData);
  }

  updateTarjet(id: number, tarjetData: Partial<Tarjet>): Observable<ApiResponse<Tarjet>> {
    return this.http.put<ApiResponse<Tarjet>>(`${this.apiUrl}/${id}`, tarjetData);
  }

  processPayment(paymentData: PaymentRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/payment`, paymentData);
  }

  validateTarjet(number: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/validate`, { number });
  }
}