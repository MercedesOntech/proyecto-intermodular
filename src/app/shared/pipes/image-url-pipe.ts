import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
    if (!value) return 'assets/images/default.jpg';
    
    // Si ya es una URL completa, la devolvemos
    if (value.startsWith('http')) return value;
    
    // Si es una ruta relativa, podemos agregar el tamaño
    const sizes = {
      small: 'w200',
      medium: 'w500',
      large: 'w780'
    };
    
    // Ejemplo para API de películas (The Movie DB)
    if (value.includes('/')) {
      return `https://image.tmdb.org/t/p/${sizes[size]}${value}`;
    }
    
    return `assets/images/${value}`;
  }
}