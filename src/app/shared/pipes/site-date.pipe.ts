import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from '../services/datetime.service';

@Pipe({ name: 'siteDate' })
export class SiteDatePipe implements PipeTransform {
  constructor(public dateService: DateTimeService) {}

  transform(date: Date, timeZone: string): string {
    return this.dateService.getSiteDate(date, timeZone);
  }
}
