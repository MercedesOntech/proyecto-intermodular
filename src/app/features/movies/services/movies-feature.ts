import { Injectable } from '@angular/core';
import { FilmService } from '../../../core/services/film';

@Injectable({
  providedIn: 'root'
})
export class MoviesFeatureService {
  constructor(private filmService: FilmService) {}

  getFeaturedMovies() {
    return this.filmService.getFilms(1, 6);
  }

  getMovieById(id: number) {
    return this.filmService.getFilmById(id);
  }
}