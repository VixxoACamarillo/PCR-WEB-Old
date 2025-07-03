// Angular
import { Component, Input } from '@angular/core';
// Service
import { DateTimeService } from '../../services/datetime.service';
// Model
import {
  SiteLocationAddressModel,
  TypeLayout
} from './models/site-location-address.model';

@Component({
  selector: 'app-site-location-address',
  templateUrl: './site-location-address.component.html',
  styleUrls: ['./site-location-address.component.scss'],
  providers: []
})
export class SiteLocationAddressComponent {
  @Input() data: SiteLocationAddressModel;
  @Input() showAddress = true;
  @Input() showHours = true;
  @Input() showMapLink = true;

  constructor(public dateTimeService: DateTimeService) {}

  public viewInGoogleMaps(url: string, $event: any) {
    $event.preventDefault();

    window.open(url, '_blank');
  }

  public isToday(dailyHours: string, timezone: string): Boolean {
    const today = this.dateTimeService.getCurrentSiteDayOfWeek(timezone);
    return !!dailyHours.match(today);
  }
}
