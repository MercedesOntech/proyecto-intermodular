import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number; product: Product }>();
  
  quantity = 0;

  increment(): void {
    this.quantity++;
    this.quantityChange.emit({ 
      productId: this.product.id, 
      quantity: this.quantity,
      product: this.product
    });
  }

  decrement(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit({ 
        productId: this.product.id, 
        quantity: this.quantity,
        product: this.product
      });
    }
  }

  resetQuantity(): void {
    this.quantity = 0;
  }
}