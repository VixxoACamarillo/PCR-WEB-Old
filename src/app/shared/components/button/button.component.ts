import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  @Input() type: String = 'primary';
  @Input() icon: String = '';
  @Input() label: String;
  @Input() fullWidth: Boolean = false;
  @Input() disabled: Boolean = false;
  @Input() buttonType: String = 'submit';
  @Output() clicked = new EventEmitter();

  className: String = '';
  isPrimary: Boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.type !== 'primary') {
      this.isPrimary = false;
    }

    if (this.type === 'secondary' || this.type === 'tertiary') {
      this.className = this.type;
    }
  }

  handleClick = ($event: any) => {
    this.clicked.emit($event);
  };
}
