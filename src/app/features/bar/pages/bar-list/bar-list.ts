import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarService } from '../../../../core/services/bar';
import { Product } from '../../../../core/models';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-pipe';
import { CartItem } from '../../models/bar';

@Component({
  selector: 'app-bar-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, SpinnerComponent, CurrencyFormatPipe, CapitalizePipe ],
  templateUrl: './bar-list.html',
  styleUrls: ['./bar-list.css']
})
export class BarListComponent implements OnInit {
  @ViewChildren(ProductCardComponent) productCards!: QueryList<ProductCardComponent>;
  
  products: Product[] = [];
  cart: CartItem[] = [];
  isLoading = true;
  searchTerm = '';
  selectedCategory = 'todos';
  
  categories = ['todos', 'palomitas', 'bebidas', 'snacks', 'dulces'];

  constructor(
    private barService: BarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.barService.getProducts(1, 100).subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  updateQuantity(event: { productId: number; quantity: number; product: Product }): void {
    const existingItem = this.cart.find(item => item.productId === event.productId);
    
    if (existingItem) {
      if (event.quantity === 0) {
        this.cart = this.cart.filter(item => item.productId !== event.productId);
      } else {
        existingItem.quantity = event.quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    } else if (event.quantity > 0) {
      this.cart.push({
        productId: event.product.id,
        name: event.product.name,
        price: event.product.price,
        quantity: event.quantity,
        imageUrl: event.product.imageUrl,
        total: event.product.price * event.quantity
      });
    }
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.21; // 21% IVA
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cart = [];
      // Resetear cantidades en los componentes hijos
      this.productCards.forEach(card => card.resetQuantity());
    }
  }

  checkout(): void {
    if (this.cart.length === 0) {
      alert('Por favor, seleccione productos para comprar');
      return;
    }
    
    const checkoutData = {
      items: this.cart,
      subtotal: this.getSubtotal(),
      tax: this.getTax(),
      total: this.getTotal()
    };
    
    this.router.navigate(['/bar/checkout'], { 
      state: checkoutData
    });
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    if (this.selectedCategory !== 'todos') {
      // Filtrar por categoría (puedes ajustar según tu modelo)
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(this.selectedCategory.toLowerCase())
      );
    }
    
    return filtered;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}