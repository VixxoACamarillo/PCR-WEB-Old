import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'taxLabelDisplay' })
export class TaxLabelDisplayPipe implements PipeTransform {
  public transform(isServiceProviderController: boolean): string {
    if (isServiceProviderController) {
      return 'Service Provider Charged Tax';
    }
    return 'Tax';
  }
}
