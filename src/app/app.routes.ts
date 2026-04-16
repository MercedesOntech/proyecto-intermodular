/*
import { Routes } from '@angular/router';

export const routes: Routes = [];
*/

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Home
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  
  // Auth
  { path: 'auth/login', loadComponent: () => import('./features/auth/pages/login/login').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/pages/register/register').then(m => m.RegisterComponent) },
  
  // Movies
  { path: 'movies', loadComponent: () => import('./features/movies/pages/movie-list/movie-list').then(m => m.MovieListComponent) },
  { path: 'movies/:id', loadComponent: () => import('./features/movies/pages/movie-detail/movie-detail').then(m => m.MovieDetailComponent) },
  
  // Bar
  { path: 'bar', loadComponent: () => import('./features/bar/pages/bar-list/bar-list').then(m => m.BarListComponent) },
  { path: 'bar/checkout', loadComponent: () => import('./features/bar/pages/checkout/checkout').then(m => m.CheckoutComponent) },
  
  // Comments
  { path: 'comments', loadComponent: () => import('./features/comments/pages/comment-list/comment-list').then(m => m.CommentListComponent) },
  
  // Settings
  { path: 'settings', loadComponent: () => import('./features/settings/settings').then(m => m.SettingsComponent) },
  
  // Admin
  { path: 'admin/movies', loadComponent: () => import('./features/admin/pages/admin-movies/admin-movies').then(m => m.AdminMoviesComponent) },
  { path: 'admin/products', loadComponent: () => import('./features/admin/pages/admin-products/admin-products').then(m => m.AdminProductsComponent) },
  { path: 'admin/users', loadComponent: () => import('./features/admin/pages/admin-users/admin-users').then(m => m.AdminUsersComponent) },
  { path: 'admin/create-user', loadComponent: () => import('./features/admin/pages/admin-create-user/admin-create-user').then(m => m.AdminCreateUserComponent) },
  
  // 404
  { path: '**', redirectTo: '/home' }
];