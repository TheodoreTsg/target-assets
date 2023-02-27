import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipePipe implements PipeTransform {
  transform(value: string, size: number): string {
    if (value.length > size) {
      return value.substring(0, size) + '...';
    }
    return value;
  }
}
