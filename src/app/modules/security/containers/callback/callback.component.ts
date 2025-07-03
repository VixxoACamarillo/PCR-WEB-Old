import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.initialRouteToLandingPage();
      return;
    }
  }
}
