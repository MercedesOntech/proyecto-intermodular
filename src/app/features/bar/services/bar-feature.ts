import { Injectable } from '@angular/core';
import { BarService } from '../../../core/services/bar';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class BarFeatureService {
  constructor(
    private barService: BarService,
    private authService: AuthService
  ) {}

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}