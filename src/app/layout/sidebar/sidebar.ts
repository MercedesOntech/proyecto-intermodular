import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  
  menuItems = [
    { path: '/home', icon: 'bi-house-door', label: 'Inicio', roles: ['client', 'employee', 'admin'] },
    { path: '/movies', icon: 'bi-film', label: 'Películas', roles: ['client', 'employee', 'admin'] },
    { path: '/bar', icon: 'bi-cup-straw', label: 'Bar', roles: ['client', 'employee', 'admin'] },
    { path: '/comments', icon: 'bi-chat-dots', label: 'Comentarios', roles: ['client', 'employee', 'admin'] },
    { path: '/admin/movies', icon: 'bi-plus-circle', label: 'Registrar Película', roles: ['employee', 'admin'] },
    { path: '/admin/products', icon: 'bi-plus-circle', label: 'Registrar Producto', roles: ['employee', 'admin'] },
    { path: '/admin/users', icon: 'bi-people', label: 'Ver Usuarios', roles: ['admin'] },
    { path: '/admin/create-user', icon: 'bi-person-plus', label: 'Añadir Usuario', roles: ['admin'] }
  ];

  constructor(private authService: AuthService) {}

  get visibleMenuItems() {
    const userRole = this.authService.getUserRole();
    return this.menuItems.filter(item => item.roles.includes(userRole));
  }
}