import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  sendPurchaseConfirmation(email: string, purchaseDetails: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/purchase-confirmation`, { email, purchaseDetails });
  }

  sendTicketConfirmation(email: string, ticketDetails: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/ticket-confirmation`, { email, ticketDetails });
  }

  sendWelcomeEmail(email: string, userName: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/welcome`, { email, userName });
  }
}