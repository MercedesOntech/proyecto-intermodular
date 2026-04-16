import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilmService } from '../../../../core/services/film';
import { Film } from '../../../../core/models';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent, SpinnerComponent],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent implements OnInit {
  movies: Film[] = [];
  filteredMovies: Film[] = [];
  isLoading = true;
  searchTerm = '';
  selectedDay = '';
  
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.filmService.getFilms(1, 50).subscribe({
      next: (response) => {
        this.movies = response.data;
        this.filteredMovies = this.movies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.isLoading = false;
      }
    });
  }

  filterByDay(day: string): void {
    this.selectedDay = day;
    this.filmService.getFilmsByDay(day).subscribe({
      next: (response) => {
        this.filteredMovies = response.data;
      },
      error: (error) => {
        console.error('Error filtering by day:', error);
        this.filteredMovies = this.movies;
      }
    });
  }

  searchMovies(): void {
    if (this.searchTerm.trim()) {
      this.filmService.searchFilms(this.searchTerm).subscribe({
        next: (response) => {
          this.filteredMovies = response.data;
        },
        error: (error) => {
          console.error('Error searching movies:', error);
          this.filteredMovies = this.movies;
        }
      });
    } else {
      this.filteredMovies = this.movies;
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredMovies = this.movies;
    this.selectedDay = '';
  }
}