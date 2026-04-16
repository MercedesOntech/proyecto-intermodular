import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(requiredRole: string): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === requiredRole) {
      return true;
    }
    
    // Admin puede acceder a todo
    if (userRole === 'admin') {
      return true;
    }
    
    // Employee puede acceder a client y employee
    if (userRole === 'employee' && (requiredRole === 'client' || requiredRole === 'employee')) {
      return true;
    }
    
    this.router.navigate(['/home']);
    return false;
  }
}