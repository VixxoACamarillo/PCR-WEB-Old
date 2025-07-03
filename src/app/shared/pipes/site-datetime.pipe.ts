import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from '../services/datetime.service';

@Pipe({ name: 'siteDateTime' })
export class SiteDateTimePipe implements PipeTransform {
  constructor(public dateService: DateTimeService) {}

  transform(date: Date, timeZone: string): string {
    return this.dateService.getSiteDateTime(date, timeZone);
  }
}
