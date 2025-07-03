import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/security/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-navless',
  templateUrl: './layout-navless.component.html'
})
export class LayoutNavlessComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.initialRouteToLandingPage();
    }
  }
}
