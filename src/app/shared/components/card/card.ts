import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() imagePosition: 'top' | 'bottom' = 'top';
  @Input() footer = '';
  @Input() hoverEffect = false;
}