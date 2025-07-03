import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';

type Profile = {
  name: string;
  picture: string;
};

/**
 *  change - A data inside the component has changed or the main button event is triggered
 *  cancel - Cancel button event is triggered
 */
export enum ModalStatus {
  CHANGE = 'change',
  CANCEL = 'cancel'
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  @Input() opened: boolean;
  @Input() disabled: boolean;
  @Input() customFooter: boolean;
  @Input() disableFooter: boolean;
  @Input() floatingClose: boolean;
  @Input() displayCloseButton: boolean = true;
  @Input() title: String;
  @Input() requiredMessage: Boolean = false;
  @Input() width: Number = 750;
  @Input() height: Number;
  @Input() primaryButton: String = 'Close';
  @Input() secondaryButton: String;
  @Input() secondaryButtonModalStatus: String = ModalStatus.CANCEL;
  @Input() profile: Profile;
  @Input() allowToSubmit: Boolean = false;
  @Input() index: number = 0;
  @Input() totalValue: number = 0;
  @Output() onClose = new EventEmitter();

  public modalStatus = ModalStatus;

  @ViewChild('btnYesModal', { static: false })
  public btnYesModal: ElementRef;

  error: Boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdRef.detectChanges();
  }

  close(data: any, status: any) {
    this.onClose.emit({ data, status });
  }

  tabKeyDown($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.btnYesModal.nativeElement.children[0].focus();
  }
}
