import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Output() btnClick = new EventEmitter<void>();

  getButtonClasses(): string {
    const classes = [`btn btn-${this.variant}`, `btn-${this.size}`];
    if (this.fullWidth) {
      classes.push('w-100');
    }
    return classes.join(' ');
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.btnClick.emit();
    }
  }
}