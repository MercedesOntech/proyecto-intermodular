import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user';
import { TarjetService } from '../../core/services/tarjet';
import { User, Tarjet } from '../../core/models';
import { SpinnerComponent } from '../../shared/components/spinner/spinner';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format-pipe';
import { DateFormatPipe } from '../../shared/pipes/date-format-pipe';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, PhoneFormatPipe, DateFormatPipe],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  tarjet: Tarjet | null = null;
  isLoading = true;
  isEditing = false;
  isChangingPassword = false;
  showTarjetForm = false;
  
  // Datos del usuario
  editUser = {
    name: '',
    email: '',
    phone: '',
    userName: ''
  };
  
  // Datos de contraseña
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  // Datos de tarjeta
  tarjetData = {
    number: '',
    expiry: '',
    cvv: ''
  };
  
  errorMessage = '';
  successMessage = '';
  
  // Indicador de fortaleza de contraseña
  passwordStrength = {
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tarjetService: TarjetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.userService.getUserById(currentUser.id).subscribe({
        next: (response) => {
          this.user = response.data;
          this.editUser = {
            name: this.user?.name || '',
            email: this.user?.email || '',
            phone: this.user?.phone?.toString() || '',
            userName: this.user?.userName || ''
          };
          this.loadTarjetData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  loadTarjetData(): void {
    if (this.user && this.user.tarjet_id) {
      this.tarjetService.getUserTarjet(this.user.id).subscribe({
        next: (response) => {
          this.tarjet = response.data;
        },
        error: (error) => {
          console.error('Error loading tarjet:', error);
        }
      });
    }
  }

  // Validación de contraseña
  checkPasswordStrength(): void {
    const password = this.passwordData.newPassword;
    this.passwordStrength = {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      minLength: password.length >= 8
    };
  }

  getPasswordStrengthValue(): number {
    return Object.values(this.passwordStrength).filter(v => v === true).length;
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrengthValue();
    if (strength <= 2) return 'Débil';
    if (strength <= 4) return 'Media';
    return 'Fuerte';
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrengthValue();
    if (strength <= 2) return 'bg-danger';
    if (strength <= 4) return 'bg-warning';
    return 'bg-success';
  }

  // Guardar cambios del usuario
  saveUserChanges(): void {
    if (!this.user) return;
    
    // Validaciones
    if (!this.editUser.name) {
      this.errorMessage = 'El nombre es requerido';
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.editUser.email)) {
      this.errorMessage = 'Email inválido';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const updatedUser = {
      ...this.user,
      name: this.editUser.name,
      email: this.editUser.email,
      phone: parseInt(this.editUser.phone),
      userName: this.editUser.userName
    };
    
    this.userService.updateUser(this.user.id, updatedUser).subscribe({
      next: (response) => {
        this.user = response.data;
        this.authService.updateUser(response.data).subscribe();
        this.isEditing = false;
        this.successMessage = 'Datos actualizados correctamente';
        setTimeout(() => this.successMessage = '', 3000);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al actualizar los datos';
      }
    });
  }

  // Cambiar contraseña
  changePassword(): void {
    if (!this.user) return;
    
    // Validaciones
    if (!this.passwordData.currentPassword) {
      this.errorMessage = 'Ingrese su contraseña actual';
      return;
    }
    
    if (!this.passwordData.newPassword) {
      this.errorMessage = 'Ingrese una nueva contraseña';
      return;
    }
    
    if (this.getPasswordStrengthValue() < 5) {
      this.errorMessage = 'La contraseña no cumple con los requisitos de seguridad';
      return;
    }
    
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.changePassword(
      this.user.id,
      this.passwordData.currentPassword,
      this.passwordData.newPassword
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.isChangingPassword = false;
        this.successMessage = 'Contraseña actualizada correctamente';
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al cambiar la contraseña';
      }
    });
  }

  // Registrar tarjeta
  formatTarjetNumber(): void {
    let value = this.tarjetData.number.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const groups = value.match(/.{1,4}/g);
    this.tarjetData.number = groups ? groups.join(' ') : value;
  }

  formatExpiry(): void {
    let value = this.tarjetData.expiry.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.tarjetData.expiry = value.slice(0, 5);
  }

  registerTarjet(): void {
    if (!this.user) return;
    
    const cleanNumber = this.tarjetData.number.replace(/\s/g, '');
    if (cleanNumber.length !== 16) {
      this.errorMessage = 'Número de tarjeta inválido (16 dígitos)';
      return;
    }
    
    if (!this.tarjetData.expiry || this.tarjetData.expiry.length < 5) {
      this.errorMessage = 'Fecha de caducidad inválida (MM/YY)';
      return;
    }
    
    if (!this.tarjetData.cvv || this.tarjetData.cvv.length < 3) {
      this.errorMessage = 'CVV inválido';
      return;
    }
    
    this.isLoading = true;
    
    const tarjetData = {
      number: cleanNumber,
      money: 0,
      expiry: new Date(`20${this.tarjetData.expiry.split('/')[1]}-${this.tarjetData.expiry.split('/')[0]}-01`)
    };
    
    this.tarjetService.registerTarjet(tarjetData, this.user.id).subscribe({
      next: (response) => {
        this.tarjet = response.data;
        this.showTarjetForm = false;
        this.tarjetData = { number: '', expiry: '', cvv: '' };
        this.successMessage = 'Tarjeta registrada correctamente';
        setTimeout(() => this.successMessage = '', 3000);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al registrar la tarjeta';
      }
    });
  }

  // Cancelar edición
  cancelEdit(): void {
    this.isEditing = false;
    if (this.user) {
      this.editUser = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone?.toString() || '',
        userName: this.user.userName
      };
    }
  }

  cancelPassword(): void {
    this.isChangingPassword = false;
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.errorMessage = '';
  }

  cancelTarjetForm(): void {
    this.showTarjetForm = false;
    this.tarjetData = { number: '', expiry: '', cvv: '' };
    this.errorMessage = '';
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}