import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(date: any): string {
    if (date && date !== '') {
      // Don't use moment or other conversion tools
      // It will try to convert these dates to your browser's time, which is not what we want to show the user
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);
      let year = date.substring(0, 4);
      return month + '/' + day + '/' + year;
    }
    return "";
  }
}
