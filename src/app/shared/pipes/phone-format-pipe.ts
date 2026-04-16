import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: number | string | null | undefined, countryCode: string = '+34'): string {
    if (!value) return '';
    
    // Convertir a string si es número
    const clean = value.toString().replace(/\D/g, '');
    
    if (clean.length === 9) {
      return `${countryCode} ${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)}`;
    }
    
    return `${countryCode} ${clean}`;
  }
}