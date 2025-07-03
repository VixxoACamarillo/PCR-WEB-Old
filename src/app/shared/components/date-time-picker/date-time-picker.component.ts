import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
  @Input() mode: String = 'date';
  @Input() value: Date;
  @Input() timezone: String;
  @Input() min: Date;
  @Input() max: Date;
  @Input() placeholder: String;
  @Input() popupSettings: any;
  @Input() error: Boolean = false;
  @Output() valueUpdated = new EventEmitter();

  placeholderDate: String;
  placeholderTime: String;
  placeholderDateTime: String;

  constructor() {}

  ngOnInit() {
    const placeholderDate = 'Set Day';
    const placeholderTime = 'Set Time';
    const placeholderDateTime = 'Set Day/Time';
    this.placeholderTime = this.placeholder || placeholderTime;
    this.placeholderDate = this.placeholder || placeholderDate;
    this.placeholderDateTime = this.placeholder || placeholderDateTime;
  }

  valueChanged = ($event: any) => {
    this.valueUpdated.emit($event);
  };
}
