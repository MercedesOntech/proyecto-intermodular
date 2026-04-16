import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starsRating',
  standalone: true
})
export class StarsRatingPipe implements PipeTransform {
  transform(rating: number, maxStars: number = 5): string {
    if (!rating) return '☆☆☆☆☆';
    
    const fullStars = Math.round(rating);
    const emptyStars = maxStars - fullStars;
    
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }
}