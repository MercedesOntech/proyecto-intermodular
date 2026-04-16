import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTo]',
  standalone: true
})
export class ScrollToDirective {
  @Input('appScrollTo') targetSelector: string = '';
  @Input() offset: number = 0;
  @Input() behavior: ScrollBehavior = 'smooth';

  @HostListener('click')
  onClick() {
    this.scrollTo();
  }

  private scrollTo() {
    const element = document.querySelector(this.targetSelector);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - this.offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: this.behavior
      });
    }
  }
}