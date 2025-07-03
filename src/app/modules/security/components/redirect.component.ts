import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-redirect-component',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public unsupportedBrowser = false;

  ngOnInit() {
    const isChromeOrSafari =
      window.navigator.userAgent.indexOf('Chrome') > -1 ||
      window.navigator.userAgent.indexOf('Safari') > -1
        ? true
        : false;
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(
      window.navigator.userAgent
    );
    const isOpera =
      window.navigator.userAgent.indexOf('OPR') > -1 ||
      window.navigator.userAgent.indexOf('Opera') > -1
        ? true
        : false;
    if (!isChromeOrSafari || isIEOrEdge || isOpera) {
      this.unsupportedBrowser = true;
    } else {
      this.authService.clearRedirectUrl();
      this.authService.initialRouteToLandingPage();
    }
  }

  public closeBrowserModal() {
    this.unsupportedBrowser = false;
    this.authService.initialRouteToLandingPage();
  }
}
