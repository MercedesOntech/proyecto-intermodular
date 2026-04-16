// src/app/core/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';
        
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = error.error.message;
        } else {
          // Error del lado del servidor
          switch (error.status) {
            case 401:
              errorMessage = 'No autorizado. Por favor, inicia sesión nuevamente.';
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'No tienes permisos para realizar esta acción.';
              break;
            case 404:
              errorMessage = 'Recurso no encontrado.';
              break;
            case 500:
              errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
              break;
            default:
              errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
          }
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}