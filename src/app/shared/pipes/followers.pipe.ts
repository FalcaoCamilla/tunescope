import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers',
  standalone: true
})
export class FollowersPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace('.', '.') + 'B';
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace('.', '.') + 'M';
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace('.', '.') + 'k';
    }

    return value.toString();
  }
}
