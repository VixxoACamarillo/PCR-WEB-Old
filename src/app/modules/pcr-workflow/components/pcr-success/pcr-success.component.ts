import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-pcr-success',
  templateUrl: './pcr-success.component.html',
  styleUrls: ['./pcr-success.component.scss']
})
export class PcrSuccessComponent implements OnInit {
  public serviceRequestNumber: string;

  constructor(
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit() {
    this.preventBackButton();
    this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('serviceRequestNumber') as string)
    )
      .subscribe((serviceRequestNumber: string) => {
        this.serviceRequestNumber = serviceRequestNumber;
      });
  }

  public preventBackButton() {
    history.pushState(null, window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, window.location.href);
    });
  }
}
