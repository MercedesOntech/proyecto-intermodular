import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film, RegisterFilm, ApiResponse, PaginatedResponse, Schedule, Genre, Director, Actor } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = `${environment.apiUrl}/films`;

  constructor(private http: HttpClient) {}

  getFilms(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Film>> {
    return this.http.get<PaginatedResponse<Film>>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getFilmById(id: number): Observable<ApiResponse<Film>> {
    return this.http.get<ApiResponse<Film>>(`${this.apiUrl}/${id}`);
  }

  getFilmsByDay(day: string): Observable<ApiResponse<Film[]>> {
    return this.http.get<ApiResponse<Film[]>>(`${this.apiUrl}/day/${day}`);
  }

  getFilmsByGenre(genreId: number): Observable<ApiResponse<Film[]>> {
    return this.http.get<ApiResponse<Film[]>>(`${this.apiUrl}/genre/${genreId}`);
  }

  searchFilms(query: string): Observable<ApiResponse<Film[]>> {
    return this.http.get<ApiResponse<Film[]>>(`${this.apiUrl}/search?q=${query}`);
  }

  createFilm(filmData: RegisterFilm): Observable<ApiResponse<Film>> {
    return this.http.post<ApiResponse<Film>>(this.apiUrl, filmData);
  }

  updateFilm(id: number, filmData: Partial<RegisterFilm>): Observable<ApiResponse<Film>> {
    return this.http.put<ApiResponse<Film>>(`${this.apiUrl}/${id}`, filmData);
  }

  deleteFilm(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  getSchedules(): Observable<ApiResponse<Schedule[]>> {
    return this.http.get<ApiResponse<Schedule[]>>(`${this.apiUrl}/schedules`);
  }

  getGenres(): Observable<ApiResponse<Genre[]>> {
    return this.http.get<ApiResponse<Genre[]>>(`${this.apiUrl}/genres`);
  }

  getDirectors(): Observable<ApiResponse<Director[]>> {
    return this.http.get<ApiResponse<Director[]>>(`${this.apiUrl}/directors`);
  }

  getActors(): Observable<ApiResponse<Actor[]>> {
    return this.http.get<ApiResponse<Actor[]>>(`${this.apiUrl}/actors`);
  }
}