import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilmService } from '../../../../core/services/film';
import { Film, Schedule } from '../../../../core/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';
import { DurationPipe } from '../../../../shared/pipes/duration-pipe';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html-pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent, DurationPipe, DateFormatPipe, SafeHtmlPipe],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Film | null = null;
  isLoading = true;
  selectedSchedule: Schedule | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(parseInt(id));
    }
  }

  loadMovie(id: number): void {
    this.isLoading = true;
    this.filmService.getFilmById(id).subscribe({
      next: (response) => {
        this.movie = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movie:', error);
        this.isLoading = false;
      }
    });
  }

  selectSchedule(schedule: Schedule): void {
    this.selectedSchedule = schedule;
  }

  bookSeats(): void {
    if (this.selectedSchedule && this.movie) {
      // Navegar a selección de asientos
      console.log('Reservar asientos para:', this.movie.name, this.selectedSchedule);
    }
  }
}