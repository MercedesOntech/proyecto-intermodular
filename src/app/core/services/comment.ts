import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, RegisterComment, ApiResponse, PaginatedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getFilmComments(filmId: number, page: number = 1, limit: number = 10): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(`${this.apiUrl}/film/${filmId}?page=${page}&limit=${limit}`);
  }

  getProductComments(productId: number, page: number = 1, limit: number = 10): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(`${this.apiUrl}/product/${productId}?page=${page}&limit=${limit}`);
  }

  getAllComments(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  createComment(commentData: RegisterComment, userId: number): Observable<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(`${this.apiUrl}/${userId}`, commentData);
  }

  updateComment(id: number, content: string): Observable<ApiResponse<Comment>> {
    return this.http.put<ApiResponse<Comment>>(`${this.apiUrl}/${id}`, { content });
  }

  deleteComment(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}