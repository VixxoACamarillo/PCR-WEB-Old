// Angular
import { Component, Input } from '@angular/core';
// Service
import { DateTimeService } from '../../services/datetime.service';
// Model
import { SiteSideBarLocationAddressModel } from './models/site-side-bar-location.model';

@Component({
  selector: 'app-site-side-bar-location-address',
  templateUrl: './site-side-bar-location-component.html',
  styleUrls: ['./site-side-bar-location-component.scss'],
  providers: []
})
export class SiteSideBarLocationAddressComponent {
  @Input() data: SiteSideBarLocationAddressModel;
  @Input() showAddress = true;
  @Input() showHours = true;
  @Input() showMapLink = true;

  constructor(public dateTimeService: DateTimeService) {}

  public viewInGoogleMaps($event: any) {
    let siteAddress = encodeURIComponent(
      this.data?.site?.addressLineOne +
        ' ' +
        this.data?.site?.city +
        ' ' +
        this.data?.site?.state +
        ' ' +
        this.data?.site?.zipcode
    );
    let url = 'https://www.google.com/maps/search/?api=1&query=' + siteAddress;
    $event.preventDefault();
    window.open(url, '_blank');
  }

  public isToday(dailyHours: string, timezone: string): Boolean {
    const today = this.dateTimeService.getCurrentSiteDayOfWeek(timezone);
    return !!dailyHours.match(today);
  }
}
