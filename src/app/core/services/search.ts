import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film, Product, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  searchAll(query: string): Observable<ApiResponse<{ films: Film[]; products: Product[] }>> {
    return this.http.get<ApiResponse<{ films: Film[]; products: Product[] }>>(`${this.apiUrl}/all?q=${query}`);
  }

  searchFilms(query: string): Observable<ApiResponse<Film[]>> {
    return this.http.get<ApiResponse<Film[]>>(`${this.apiUrl}/films?q=${query}`);
  }

  searchProducts(query: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products?q=${query}`);
  }
}