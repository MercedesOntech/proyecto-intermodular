import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, BarTicket, BarPurchaseRequest, RegisterProduct, ApiResponse, PaginatedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private apiUrl = `${environment.apiUrl}/bar`;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${this.apiUrl}/products?page=${page}&limit=${limit}`);
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`);
  }

  searchProducts(query: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/search?q=${query}`);
  }

  createProduct(productData: RegisterProduct): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/products`, productData);
  }

  updateProduct(id: number, productData: Partial<RegisterProduct>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`, productData);
  }

  deleteProduct(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/products/${id}`);
  }

  getUserBarTickets(userId: number): Observable<ApiResponse<BarTicket[]>> {
    return this.http.get<ApiResponse<BarTicket[]>>(`${this.apiUrl}/tickets/user/${userId}`);
  }

  purchaseProducts(purchaseData: BarPurchaseRequest, userId: number): Observable<ApiResponse<BarTicket>> {
    return this.http.post<ApiResponse<BarTicket>>(`${this.apiUrl}/purchase/${userId}`, purchaseData);
  }
}