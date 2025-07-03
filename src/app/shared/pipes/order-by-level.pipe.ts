import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderByLevel'
})
export class OrderByLevelPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: string): any[] {
    const sortOrder = order == 'desc' ? true : false; // setting default ascending order

    return orderBy(array, [sortBy], [sortOrder]);
  }
}
