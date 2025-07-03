import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() public latitude: any;
  @Input() public longitude: any;
  @Input() public zoom: any;

  constructor() {}

  ngOnInit() {
    this.latitude = Number(this.latitude);
    this.longitude = Number(this.longitude);
  }
}
