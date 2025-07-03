import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
@Component({
  selector: 'app-meta-data-info',
  templateUrl: './meta-data-info.component.html',
  styleUrls: ['./meta-data-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetaDataInfoComponent implements OnInit {
  @Input() id: any = '';
  @Input() createdDate: string = '';
  @Input() status: string = '';
  @Input() timezone: any = '';
  @Input() title: string = '';

  ngOnInit() {}
}
