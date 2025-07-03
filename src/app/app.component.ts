import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ServicerequestGuard } from './service/servicerequest.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  previousUrl: string;
  hideNavBarItemUrl: string = '/license-acceptance-error';
  public isShowNavBar: boolean = true;
  constructor(router: Router, public servicerequestGuard: ServicerequestGuard) {
    const blacklistedTrackingUrls = ['/callback'];
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('?')[0].split('#')[0];
        this.isShowNavBar = true;
        if (url == this.hideNavBarItemUrl) {
          this.isShowNavBar = false;
        }
        if (blacklistedTrackingUrls.indexOf(url) < 0) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
        sessionStorage.setItem('previousRoute', this.previousUrl);
        this.previousUrl = event.url;
      }
    });
  }
}
