import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss']
})
export class InternalServerErrorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public goBack() {
    this.location.back();
  }
}
