import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string, format: string = 'dd/MM/yyyy', locale: string = 'es-ES'): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) return '';
    
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (format) {
      case 'dd/MM/yyyy':
        options.day = '2-digit';
        options.month = '2-digit';
        options.year = 'numeric';
        break;
      case 'dd/MM/yyyy HH:mm':
        options.day = '2-digit';
        options.month = '2-digit';
        options.year = 'numeric';
        options.hour = '2-digit';
        options.minute = '2-digit';
        break;
      case 'full':
        options.dateStyle = 'full';
        break;
      case 'long':
        options.dateStyle = 'long';
        break;
      default:
        options.dateStyle = 'medium';
    }
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
}