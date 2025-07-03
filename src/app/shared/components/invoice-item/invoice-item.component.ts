import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  providers: []
})
export class InvoiceItemComponent implements OnChanges {
  @Input()
  invoiceItem: any;
  @Input()
  index: any;
  @Input()
  isTotal: Boolean;
  @Output()
  deleteRow = new EventEmitter();
  @Output()
  partCheck = new EventEmitter();
  @Input() hasCost = true; // If false, rate will be displayed

  constructor() {}

  ngOnChanges() {}

  /**
   * Deletes the selected row in the current item list
   */
  onDeleteRow($index: any): void {
    this.deleteRow.emit($index);
  }

  onPartCheck() {
    this.partCheck.emit();
  }
}
