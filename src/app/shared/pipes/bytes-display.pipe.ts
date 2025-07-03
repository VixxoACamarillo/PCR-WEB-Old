import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bytesDisplay' })
export class BytesDisplayPipe implements PipeTransform {
  private readonly units: Array<string> = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
  ];
  private readonly kilobyte: number = 1024;

  public transform(bytes: number | string): string {
    let bytesValue: number;
    if (typeof bytes === 'string') {
      bytesValue = parseInt(bytes, 10) || 0;
    } else {
      bytesValue = bytes;
    }

    let unitKey: number = 0;
    while (bytesValue >= this.kilobyte && ++unitKey) {
      bytesValue = bytesValue / this.kilobyte;
    }
    let precision: number;
    if (bytesValue < 10 && unitKey > 0) {
      precision = 1;
    } else {
      precision = 0;
    }

    let bytesDisplay: string =
      bytesValue.toFixed(precision) + ' ' + this.units[unitKey];
    return bytesDisplay;
  }
}
