import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilmService } from '../../../../core/services/film';
import { Film, RegisterFilm, Genre, Director, Actor, Schedule } from '../../../../core/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './admin-movies.html',
  styleUrls: ['./admin-movies.css']
})
export class AdminMoviesComponent implements OnInit {
  movies: Film[] = [];
  isLoading = true;
  showForm = false;
  editingMovie: Film | null = null;
  
  genres: Genre[] = [];
  directors: Director[] = [];
  actors: Actor[] = [];
  schedules: Schedule[] = [];
  
  formData: RegisterFilm = {
    name: '',
    description: '',
    releaseDate: new Date(),
    duration: '',
    imageUrl: '',
    trailerUrl: '',
    room_id: 1,
    film_type_id: 1,
    genre_ids: [],
    director_ids: [],
    actor_ids: [],
    schedule_ids: []
  };

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadSelectData();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.filmService.getFilms(1, 100).subscribe({
      next: (response) => {
        this.movies = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.isLoading = false;
      }
    });
  }

  loadSelectData(): void {
    this.filmService.getGenres().subscribe({
      next: (response) => this.genres = response.data
    });
    
    this.filmService.getDirectors().subscribe({
      next: (response) => this.directors = response.data
    });
    
    this.filmService.getActors().subscribe({
      next: (response) => this.actors = response.data
    });
    
    this.filmService.getSchedules().subscribe({
      next: (response) => this.schedules = response.data
    });
  }

  openCreateForm(): void {
    this.showForm = true;
    this.editingMovie = null;
    this.resetForm();
  }

  editMovie(movie: Film): void {
    this.editingMovie = movie;
    this.showForm = true;
    this.formData = {
      name: movie.name,
      description: movie.description,
      releaseDate: new Date(movie.releaseDate),
      duration: String(movie.duration || '0'),
      imageUrl: movie.imageUrl,
      trailerUrl: movie.trailerUrl,
      room_id: movie.room_id,
      film_type_id: movie.film_type_id,
      genre_ids: movie.genres?.map(g => g.id) || [],
      director_ids: movie.directors?.map(d => d.id) || [],
      actor_ids: movie.actors?.map(a => a.id) || [],
      schedule_ids: movie.schedules?.map(s => s.id) || []
    };
  }

  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.filmService.deleteFilm(id).subscribe({
        next: () => {
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error deleting movie:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  saveMovie(): void {
    if (!this.validateForm()) {
      return;
    }
    
    if (this.editingMovie) {
      this.filmService.updateFilm(this.editingMovie.id, this.formData).subscribe({
        next: () => {
          this.loadMovies();
          this.showForm = false;
          alert('Película actualizada con éxito');
        },
        error: (error) => {
          console.error('Error updating movie:', error);
          alert('Error al actualizar la película');
        }
      });
    } else {
      this.filmService.createFilm(this.formData).subscribe({
        next: () => {
          this.loadMovies();
          this.showForm = false;
          alert('Película creada con éxito');
        },
        error: (error) => {
          console.error('Error creating movie:', error);
          alert('Error al crear la película');
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.formData.name) {
      alert('El nombre es requerido');
      return false;
    }
    if (!this.formData.duration) {
      alert('La duración es requerida');
      return false;
    }
    if (!this.formData.imageUrl) {
      alert('La URL de la imagen es requerida');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      description: '',
      releaseDate: new Date(),
      duration: '',
      imageUrl: '',
      trailerUrl: '',
      room_id: 1,
      film_type_id: 1,
      genre_ids: [],
      director_ids: [],
      actor_ids: [],
      schedule_ids: []
    };
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingMovie = null;
    this.resetForm();
  }

  toggleSelection(array: number[], value: number): void {
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  isSelected(array: number[], value: number): boolean {
    return array.indexOf(value) !== -1;
  }

  formatDuration(minutes: number | string): string {
    const mins = typeof minutes === 'string' ? parseInt(minutes) : minutes;
    if (!mins || isNaN(mins)) return '0 min';
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours === 0) return `${remainingMins} min`;
    if (remainingMins === 0) return `${hours}h`;
    return `${hours}h ${remainingMins}min`;
  }
}