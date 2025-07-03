import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from '../services/datetime.service';

@Pipe({ name: 'siteTime' })
export class SiteTimePipe implements PipeTransform {
  constructor(public dateService: DateTimeService) {}

  transform(date: Date, timeZone: string): string {
    return this.dateService.getSiteTime(date, timeZone);
  }
}
