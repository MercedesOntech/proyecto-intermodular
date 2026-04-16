import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, allWords: boolean = true): string {
    if (!value) return '';
    
    if (allWords) {
      return value.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}