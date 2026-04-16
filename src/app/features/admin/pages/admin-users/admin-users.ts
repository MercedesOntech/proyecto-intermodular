import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user';
import { User } from '../../../../core/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent ],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  searchTerm = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(1, 100).subscribe({
      next: (response) => {
        this.users = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  get filteredUsers(): User[] {
    if (!this.searchTerm) {
      return this.users;
    }
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.userName.toLowerCase().includes(term)
    );
  }

  getUserRoleName(roleId: number): string {
    switch(roleId) {
      case 1: return 'Cliente';
      case 2: return 'Empleado';
      case 3: return 'Administrador';
      default: return 'Desconocido';
    }
  }

  getUserRoleBadge(roleId: number): string {
    switch(roleId) {
      case 1: return 'bg-primary';
      case 2: return 'bg-warning';
      case 3: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}