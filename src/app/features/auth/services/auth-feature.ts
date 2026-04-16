import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureService {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  getUserRole(): string {
    return this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
  }
}