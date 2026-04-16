import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: true
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: string, defaultImage: string = 'assets/images/default.jpg'): string {
    if (!value || value === '') {
      return defaultImage;
    }
    return value;
  }
}