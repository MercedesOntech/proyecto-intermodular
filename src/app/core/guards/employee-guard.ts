// src/app/core/guards/employee.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === 'employee' || userRole === 'admin') {
      return true;
    }
    
    this.router.navigate(['/home']);
    return false;
  }
}