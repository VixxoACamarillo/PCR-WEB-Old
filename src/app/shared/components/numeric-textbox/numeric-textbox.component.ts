import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-numeric-textbox',
  templateUrl: './numeric-textbox.component.html',
  styleUrls: ['./numeric-textbox.component.scss']
})
export class NumericTextBoxComponent {
  @Input() inputId: string;
  @Input() value: number;
  @Input() minimumValue: Number = 0;
  @Input() maximumValue: number;
  @Input() decimalsValue: number;
  @Input() format = 'n';
  @Output() valueUpdated = new EventEmitter();
  private lastValue: number;

  /**
   * On Key Down event check if new number introduced is a valid (not greater than max)
   * @param $event
   */
  onKeyDown($event: any): void {
    if (!isNaN($event.key)) {
      const newNumber = Number('' + this.lastValue + $event.key);
      if (newNumber > this.maximumValue) {
        $event.preventDefault();
      }
    }
  }

  /**
   * On value change event, store current value as lastValue.
   * @param $event
   */
  valueChanged($event: any): void {
    this.lastValue = $event;
    this.valueUpdated.emit($event);
  }
}
