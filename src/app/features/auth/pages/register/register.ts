import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { RegisterUser } from '../../../../core/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
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
    acceptTerms: false
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  phonePrefixes = ['+34', '+33', '+49', '+44', '+1', '+52', '+54', '+56'];

  // Para la validación en tiempo real
  passwordStrength = {
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  checkPasswordStrength(): void {
    const password = this.userData.password;
    this.passwordStrength = {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      minLength: password.length >= 8
    };
  }

  validateForm(): boolean {
    // Validar nombre
    if (!this.userData.name || !this.userData.lastName) {
      this.errorMessage = 'Por favor, ingrese nombre y apellidos';
      return false;
    }

    // Validar nombre de usuario
    if (!this.userData.userName || this.userData.userName.length < 3) {
      this.errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres';
      return false;
    }

    // Validar email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.userData.email)) {
      this.errorMessage = 'Por favor, ingrese un email válido';
      return false;
    }

    // Validar teléfono
    if (!this.userData.phone || this.userData.phone.length < 9) {
      this.errorMessage = 'Por favor, ingrese un número de teléfono válido';
      return false;
    }

    // Validar contraseña
    if (!this.passwordStrength.hasUpper || !this.passwordStrength.hasLower ||
      !this.passwordStrength.hasNumber || !this.passwordStrength.hasSpecial ||
      !this.passwordStrength.minLength) {
      this.errorMessage = 'La contraseña no cumple con los requisitos de seguridad';
      return false;
    }

    // Validar confirmación de contraseña
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }

    // Validar edad (mayor de 18 años)
    const birthDate = new Date(this.userData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      this.errorMessage = 'Debes ser mayor de 18 años para registrarte';
      return false;
    }

    // Validar términos
    if (!this.userData.acceptTerms) {
      this.errorMessage = 'Debes aceptar la política de privacidad';
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

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al registrar usuario. El email o usuario ya existe.';
      }
    });
  }

  downloadPrivacyPolicy(): void {
    const content = `POLÍTICA DE PRIVACIDAD - ROMERO CINE

Última actualización: ${new Date().toLocaleDateString()}

1. RECOGIDA DE DATOS
Recogemos los siguientes datos personales:
- Nombre y apellidos
- Correo electrónico
- Número de teléfono
- Fecha de nacimiento
- Nombre de usuario

2. USO DE LOS DATOS
Utilizamos sus datos para:
- Gestionar su cuenta de usuario
- Procesar sus compras de entradas y productos
- Enviar confirmaciones por email
- Mejorar nuestros servicios

3. PROTECCIÓN DE DATOS
Sus datos están protegidos mediante medidas de seguridad técnicas y organizativas.

4. SUS DERECHOS
Puede acceder, rectificar o eliminar sus datos personales en cualquier momento.

5. CONTACTO
Para cualquier consulta, contacte con: mercedesromeroweb@gmail.com

© ${new Date().getFullYear()} ROMERO CINE - Todos los derechos reservados.`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'politica-privacidad.pdf';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  getPasswordStrengthClass(): string {
    const strength = Object.values(this.passwordStrength).filter(v => v === true).length;
    if (strength <= 2) return 'bg-danger';
    if (strength <= 4) return 'bg-warning';
    return 'bg-success';
  }

  getPasswordStrengthText(): string {
    const strength = Object.values(this.passwordStrength).filter(v => v === true).length;
    if (strength <= 2) return 'Débil';
    if (strength <= 4) return 'Media';
    return 'Fuerte';
  }

  getPasswordStrengthValue(): number {
    return Object.values(this.passwordStrength).filter(v => v === true).length;
  }
}