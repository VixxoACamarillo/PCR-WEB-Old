import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverseFormatPayment' })
export class ReverseFormatPaymentPipe implements PipeTransform {
  transform(paymentStatus: any): any {
    switch (paymentStatus) {
      case 'Forecast':
        paymentStatus = 'forecasted';
        break;
      case 'Payment In Process':
        paymentStatus = 'pending';
        break;
      case 'Paid':
        paymentStatus = 'paid';
        break;
      case 'Awaiting Customer Payment':
        paymentStatus = 'awaitingcustomerpayment';
        break;
      default:
        break;
    }

    return paymentStatus;
  }
}
