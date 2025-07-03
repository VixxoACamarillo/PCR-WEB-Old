import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      const am = moment(a[field]).format();
      const bm = moment(b[field]).format();
      if (am > moment(b[field]).format(bm)) {
        return -1;
      } else if (am < bm) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
