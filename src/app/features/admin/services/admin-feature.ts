import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminFeatureService {
  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  isEmployee(): boolean {
    const role = this.authService.getUserRole();
    return role === 'employee' || role === 'admin';
  }

  canAccessAdminPanel(): boolean {
    return this.isAdmin();
  }

  canAccessEmployeePanel(): boolean {
    return this.isEmployee();
  }
}