import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimeService } from '../../services/datetime.service';
import { SrPriorityUtils } from '../../utils/sr-priority.utils';
import * as moment from 'moment';

@Component({
  selector: 'app-service-request-item',
  templateUrl: './service-request-item.component.html',
  styleUrls: ['./service-request-item.component.scss'],
  providers: []
})
export class ServiceRequestItemComponent implements OnInit {
  @Output() clicked = new EventEmitter();
  @Input() srItem: any;
  @Input() isLast: Boolean;

  moment = moment;

  constructor(public dateTimeService: DateTimeService) {}

  ngOnInit() {
    this.srItem.customPriority = SrPriorityUtils.getPriorityColorClass(
      this.srItem
    );
  }
  /*
   * Dispatch an event when user clicks on the list item.
   */
  onClick($event: Event) {
    this.clicked.emit($event);
  }
}
