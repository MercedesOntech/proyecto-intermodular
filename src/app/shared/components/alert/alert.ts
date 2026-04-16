import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() message = '';
  @Input() dismissible = true;
  @Input() show = true;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.show = false;
    this.closed.emit();
  }

  getIconClass(): string {
    switch (this.type) {
      case 'success': return 'bi-check-circle-fill';
      case 'danger': return 'bi-exclamation-triangle-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      case 'info': return 'bi-info-circle-fill';
      default: return 'bi-info-circle-fill';
    }
  }
}