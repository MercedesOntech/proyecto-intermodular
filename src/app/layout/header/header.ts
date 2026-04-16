import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { SearchService } from '../../core/services/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  
  isLoggedIn = false;
  currentUser: any = null;
  userRole = '';
  showUserMenu = false;
  searchQuery = '';
  searchResults: any[] = [];
  showSearchResults = false;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      this.userRole = user?.userType?.name || 'client';
    });
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }

  goToSettings(): void {
    this.showUserMenu = false;
  }

  goToRegisterTarjet(): void {
    this.showUserMenu = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchService.searchAll(this.searchQuery).subscribe({
        next: (response) => {
          this.searchResults = response.data.films || [];
          this.showSearchResults = true;
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
        }
      });
    }
  }

  selectResult(item: any): void {
    this.showSearchResults = false;
    this.searchQuery = '';
  }

  closeSearchResults(): void {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  goToLogin(): void {
    // this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    // this.router.navigate(['/auth/register']);
  }
}