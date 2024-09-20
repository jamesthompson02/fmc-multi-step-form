import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capital',
  standalone: true,
})
export class CapitalPipe implements PipeTransform {
  transform(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
