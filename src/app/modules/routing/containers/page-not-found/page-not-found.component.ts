import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/security/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public authService: AuthService, private location: Location) { }

  ngOnInit(): void {
  }

  public goBack() {
    this.location.back();
  }

}
