import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    // Si no hay valor
    if (!value) return '0 min';
    
    // Convertir a string si es número
    const durationStr = value.toString();
    
    // Si ya tiene formato "120 min" o "2h 30min"
    if (durationStr.includes('h') || durationStr.includes('min')) {
      return durationStr;
    }
    
    // Si es solo número (minutos)
    const minutes = parseInt(durationStr);
    if (isNaN(minutes)) return '0 min';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  }
}