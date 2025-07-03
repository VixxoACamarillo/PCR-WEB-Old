import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneNumberFormatter' })
export class PhoneNumberFormatterPipe implements PipeTransform {
  public transform(phoneNumber: string): string | null {
    const phoneNumberParts = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !phoneNumberParts
      ? null
      : `(${phoneNumberParts[1]}) ${phoneNumberParts[2]}-${
          phoneNumberParts[3]
        }`;
  }
}
