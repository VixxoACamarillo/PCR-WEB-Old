import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @ViewChild('dropdownlist', { static: false }) public dropdownlist: any;

  @Input() data: Array<string>;
  @Input() textField: any = undefined;
  @Input() valueField: any = undefined;
  @Input() templateType: any = undefined;
  @Input() disabled: boolean = false;
  @Input() isValid: boolean = false;
  @Output() selectedChange = new EventEmitter();
  @Output() valueUpdated = new EventEmitter();
  private selectedValue = '';

  @Input()
  get selected() {
    return this.selectedValue;
  }
  set selected(val: any) {
    this.selectedValue = val;
    this.selectedChange.emit(this.selectedValue);
  }

  public valueChange = ($event: any) => {
    this.valueUpdated.emit($event);
  };

  constructor(private elRef: ElementRef) {}

  closeDropdown() {
    this.dropdownlist.toggle(false);
  }

  /**
   * On open add arrow icon open class.
   */
  onOpen(): void {
    const element = this.elRef.nativeElement.querySelector(
      '.k-i-arrow-s.k-icon'
    );
    element.classList.add('arrow-open');
  }

  /**
   * On close remove arrow icon open class.
   */
  onClose(): void {
    const element = this.elRef.nativeElement.querySelector(
      '.k-i-arrow-s.k-icon'
    );
    element.classList.remove('arrow-open');
  }
}
