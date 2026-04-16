import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  @Input() allowDecimal = false;
  @Input() allowNegative = false;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    
    // Permitir teclas de control
    if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'Escape' || key === 'Enter' ||
        key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown' ||
        key === 'Home' || key === 'End' || key === 'Shift' || key === 'Control' || key === 'Alt') {
      return;
    }

    // Permitir punto decimal
    if (this.allowDecimal && key === '.') {
      const currentValue = (event.target as HTMLInputElement).value;
      if (currentValue.includes('.')) {
        event.preventDefault();
      }
      return;
    }

    // Permitir número negativo
    if (this.allowNegative && key === '-') {
      const currentValue = (event.target as HTMLInputElement).value;
      if (currentValue.includes('-')) {
        event.preventDefault();
      }
      return;
    }

    // Verificar si es número
    if (!/^\d+$/.test(key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      const validPattern = this.allowDecimal ? /^\d*\.?\d*$/ : /^\d+$/;
      if (!validPattern.test(pastedText)) {
        event.preventDefault();
      }
    }
  }
}