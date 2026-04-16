import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user';
import { RegisterUser } from '../../../../core/models';

@Component({
  selector: 'app-admin-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-create-user.html',
  styleUrls: ['./admin-create-user.css']
})
export class AdminCreateUserComponent {
  userData: RegisterUser = {
    name: '',
    lastName: '',
    birthDate: new Date(),
    userName: '',
    email: '',
    phone: '',
    phonePrefix: '+34',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
    userType: 'client'
  };
  
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  phonePrefixes = ['+34', '+33', '+49', '+44', '+1'];
  userTypes = [
    { value: 'client', label: 'Cliente' },
    { value: 'employee', label: 'Empleado' }
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  validateForm(): boolean {
    if (!this.userData.name || !this.userData.lastName) {
      this.errorMessage = 'Por favor, ingrese nombre y apellidos';
      return false;
    }
    
    if (!this.userData.userName || this.userData.userName.length < 3) {
      this.errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres';
      return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.userData.email)) {
      this.errorMessage = 'Por favor, ingrese un email válido';
      return false;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.userData.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
      return false;
    }
    
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }
    
    const birthDate = new Date(this.userData.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      this.errorMessage = 'Debe ser mayor de 18 años';
      return false;
    }
    
    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.userService.createUser(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Usuario creado con éxito';
        setTimeout(() => {
          this.router.navigate(['/admin/users']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al crear usuario';
      }
    });
  }
}