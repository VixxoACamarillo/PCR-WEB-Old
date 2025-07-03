import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type ComboboxItem = {
  id: string;
  name: string;
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent implements OnInit, OnChanges {
  @Input() listItems: Array<ComboboxItem>;
  @Input() listHeader: string;
  @Input() selection: ComboboxItem;
  @Input() placeholder: string;
  @Output() valueChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() filterChange = new EventEmitter();
  public opened = false;

  source: Array<ComboboxItem>;
  filterText: string;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    this.source = JSON.parse(JSON.stringify(this.listItems || null));
  }

  ngOnChanges(): void {
    this.source = JSON.parse(JSON.stringify(this.listItems || null));
  }

  allowHtml(value: string): SafeHtml {
    const valueRegExp = new RegExp(`(${this.filterText})`, 'i');
    value = value.replace(valueRegExp, '<b>$1</b>');
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  onUpdateValue(value: ComboboxItem) {
    if (!value) {
      return;
    }
    this.selection = value;
    if (this.valueChange) {
      this.valueChange.emit(this.selection);
    }
  }

  onUpdateSelection(selection: ComboboxItem) {
    this.selection = selection;
    if (this.selectionChange) {
      this.selectionChange.emit(this.selection);
    }
  }

  onUpdateFilter(filter: string) {
    this.filterText = filter;
    this.listItems = this.source.filter((item: ComboboxItem) => {
      return item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
    if (this.filterChange) {
      this.filterChange.emit(filter);
    }
  }

  onOpen() {
    this.opened = true;
  }

  onClose() {
    this.opened = false;
  }
}
