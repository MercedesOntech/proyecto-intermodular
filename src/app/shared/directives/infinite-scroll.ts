import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter<void>();
  @Input() scrollThreshold = 100;
  @Input() disabled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.disabled) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPosition = scrollTop + windowHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    
    if (scrollPercentage > this.scrollThreshold) {
      this.scrolled.emit();
    }
  }
}