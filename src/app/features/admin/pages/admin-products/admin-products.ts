import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarService } from '../../../../core/services/bar';
import { Product, RegisterProduct } from '../../../../core/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, CurrencyFormatPipe ],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  showForm = false;
  editingProduct: Product | null = null;
  
  formData: RegisterProduct = {
    name: '',
    price: 0,
    imageUrl: '',
    stock: 0
  };

  constructor(private barService: BarService) {}

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

  openCreateForm(): void {
    this.showForm = true;
    this.editingProduct = null;
    this.resetForm();
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.showForm = true;
    this.formData = {
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock || 0
    };
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.barService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Error al eliminar el producto');
        }
      });
    }
  }

  saveProduct(): void {
    if (!this.validateForm()) {
      return;
    }
    
    if (this.editingProduct) {
      this.barService.updateProduct(this.editingProduct.id, this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.showForm = false;
          alert('Producto actualizado con éxito');
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Error al actualizar el producto');
        }
      });
    } else {
      this.barService.createProduct(this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.showForm = false;
          alert('Producto creado con éxito');
        },
        error: (error) => {
          console.error('Error creating product:', error);
          alert('Error al crear el producto');
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.formData.name) {
      alert('El nombre es requerido');
      return false;
    }
    if (!this.formData.price || this.formData.price <= 0) {
      alert('El precio debe ser mayor a 0');
      return false;
    }
    if (!this.formData.imageUrl) {
      alert('La URL de la imagen es requerida');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      price: 0,
      imageUrl: '',
      stock: 0
    };
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingProduct = null;
    this.resetForm();
  }
}