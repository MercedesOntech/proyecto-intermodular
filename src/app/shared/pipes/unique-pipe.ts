import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  standalone: true
})
export class UniquePipe implements PipeTransform {
  transform(array: any[], property?: string): any[] {
    if (!array) return [];
    
    if (property) {
      // Eliminar duplicados basados en una propiedad
      const unique = new Map();
      array.forEach(item => {
        const key = item[property];
        if (!unique.has(key)) {
          unique.set(key, item);
        }
      });
      return Array.from(unique.values());
    }
    
    // Eliminar duplicados primitivos
    return [...new Set(array)];
  }
}