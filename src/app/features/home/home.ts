// src/app/features/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmService } from '../../core/services/film';
import { BarService } from '../../core/services/bar';
import { Film, Product } from '../../core/models';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';
import { DurationPipe } from '../../shared/pipes/duration-pipe';
import { SpinnerComponent } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe, CurrencyFormatPipe, DurationPipe, SpinnerComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredFilms: Film[] = [];
  featuredProducts: Product[] = [];
  isLoading = true;
  currentFilmSlide = 0;
  currentProductSlide = 0;
  private autoPlayInterval: any;

  constructor(
    private filmService: FilmService,
    private barService: BarService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  loadData(): void {
    this.isLoading = true;
    
    this.filmService.getFilms(1, 6).subscribe({
      next: (response) => {
        this.featuredFilms = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading films:', error);
        this.isLoading = false;
      }
    });
    
    this.barService.getProducts(1, 6).subscribe({
      next: (response) => {
        this.featuredProducts = response.data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  nextFilmSlide(): void {
    if (this.currentFilmSlide < this.featuredFilms.length - 1) {
      this.currentFilmSlide++;
    } else {
      this.currentFilmSlide = 0;
    }
  }

  prevFilmSlide(): void {
    if (this.currentFilmSlide > 0) {
      this.currentFilmSlide--;
    } else {
      this.currentFilmSlide = this.featuredFilms.length - 1;
    }
  }

  goToFilmSlide(index: number): void {
    this.currentFilmSlide = index;
  }

  nextProductSlide(): void {
    if (this.currentProductSlide < this.featuredProducts.length - 1) {
      this.currentProductSlide++;
    } else {
      this.currentProductSlide = 0;
    }
  }

  prevProductSlide(): void {
    if (this.currentProductSlide > 0) {
      this.currentProductSlide--;
    } else {
      this.currentProductSlide = this.featuredProducts.length - 1;
    }
  }

  goToProductSlide(index: number): void {
    this.currentProductSlide = index;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextFilmSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/images/default.jpg';
  }
}