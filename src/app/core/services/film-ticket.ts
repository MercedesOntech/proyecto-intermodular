import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmTicket, FilmPurchaseRequest, Chair, ApiResponse, PaginatedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmTicketService {
  private apiUrl = `${environment.apiUrl}/film-tickets`;

  constructor(private http: HttpClient) {}

  getUserTickets(userId: number): Observable<ApiResponse<FilmTicket[]>> {
    return this.http.get<ApiResponse<FilmTicket[]>>(`${this.apiUrl}/user/${userId}`);
  }

  getTicketById(id: number): Observable<ApiResponse<FilmTicket>> {
    return this.http.get<ApiResponse<FilmTicket>>(`${this.apiUrl}/${id}`);
  }

  getAvailableSeats(filmId: number, scheduleId: number, date: Date): Observable<ApiResponse<Chair[]>> {
    return this.http.get<ApiResponse<Chair[]>>(`${this.apiUrl}/seats/${filmId}/${scheduleId}?date=${date}`);
  }

  purchaseTicket(purchaseData: FilmPurchaseRequest): Observable<ApiResponse<FilmTicket>> {
    return this.http.post<ApiResponse<FilmTicket>>(`${this.apiUrl}/purchase`, purchaseData);
  }

  cancelTicket(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  getUserTicketsPaginated(userId: number, page: number, limit: number): Observable<PaginatedResponse<FilmTicket>> {
    return this.http.get<PaginatedResponse<FilmTicket>>(`${this.apiUrl}/user/${userId}/paginated?page=${page}&limit=${limit}`);
  }
}