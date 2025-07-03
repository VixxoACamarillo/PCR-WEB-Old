import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormatter' })
export class CurrencyFormatterPipe implements PipeTransform {
  public transform(amount: number): string {
    if (Math.sign(amount) === -1) {
      let positiveValue = Math.abs(amount);
      return `-$${positiveValue.toFixed(2)}`;
    }

    if (amount !== null) {
      if (amount && !Number.isNaN(amount)) {
        let num = amount.toFixed(2);
        let parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return '$' + parts.join('.');
      }
      return '$' + amount.toString() + '.00';
    } else {
      return '$0.00';
    }
  }
}
