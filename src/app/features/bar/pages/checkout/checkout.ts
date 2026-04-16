import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TarjetService } from '../../../../core/services/tarjet';
import { BarService } from '../../../../core/services/bar';
import { EmailService } from '../../../../core/services/email';
import { AuthService } from '../../../../core/services/auth';
import { RegisterTarjet } from '../../../../core/models';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyFormatPipe],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  
  tarjetNumber = '';
  tarjetExpiry = '';
  tarjetCvv = '';
  hasTarjet = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private tarjetService: TarjetService,
    private barService: BarService,
    private emailService: EmailService,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    if (state) {
      this.cartItems = state.items || [];
      this.subtotal = state.subtotal || 0;
      this.tax = state.tax || 0;
      this.total = state.total || 0;
    }
  }

  ngOnInit(): void {
    if (this.cartItems.length === 0) {
      this.router.navigate(['/bar']);
    }
    this.checkUserTarjet();
  }

  checkUserTarjet(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.tarjet_id) {
      this.tarjetService.getUserTarjet(user.id).subscribe({
        next: (response) => {
          this.hasTarjet = true;
        },
        error: () => {
          this.hasTarjet = false;
        }
      });
    } else {
      this.hasTarjet = false;
    }
  }

  validateTarjet(): boolean {
    const cleanNumber = this.tarjetNumber.replace(/\s/g, '');
    if (cleanNumber.length !== 16) {
      this.errorMessage = 'El número de tarjeta debe tener 16 dígitos';
      return false;
    }
    
    if (!this.tarjetExpiry || this.tarjetExpiry.length < 5) {
      this.errorMessage = 'La fecha de caducidad es requerida (MM/YY)';
      return false;
    }
    
    if (!this.tarjetCvv || this.tarjetCvv.length < 3) {
      this.errorMessage = 'El CVV es requerido';
      return false;
    }
    
    return true;
  }

  registerAndPay(): void {
    if (!this.validateTarjet()) {
      return;
    }
    
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    const tarjetData: RegisterTarjet = {
      number: this.tarjetNumber.replace(/\s/g, ''),
      money: this.total,
      expiry: new Date(`20${this.tarjetExpiry.split('/')[1]}-${this.tarjetExpiry.split('/')[0]}-01`)
    };
    
    this.isLoading = true;
    this.tarjetService.registerTarjet(tarjetData, user.id).subscribe({
      next: () => {
        this.hasTarjet = true;
        this.processPayment();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al registrar tarjeta';
      }
    });
  }

  processPayment(): void {
    this.isLoading = true;
    
    const purchaseData = {
      products: this.cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      tarjetId: 0,
      totalAmount: this.total
    };
    
    const user = this.authService.getCurrentUser();
    if (!user) return;
    
    this.barService.purchaseProducts(purchaseData, user.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Compra realizada con éxito';
        
        // Enviar email de confirmación
        this.emailService.sendPurchaseConfirmation(user.email, {
          items: this.cartItems,
          subtotal: this.subtotal,
          tax: this.tax,
          total: this.total,
          date: new Date()
        }).subscribe();
        
        setTimeout(() => {
          this.router.navigate(['/bar']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al procesar el pago';
      }
    });
  }

  payWithExistingCard(): void {
    this.processPayment();
  }

  formatTarjetNumber(): void {
    let value = this.tarjetNumber.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const groups = value.match(/.{1,4}/g);
    this.tarjetNumber = groups ? groups.join(' ') : value;
  }

  formatExpiry(): void {
    let value = this.tarjetExpiry.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.tarjetExpiry = value.slice(0, 5);
  }
}