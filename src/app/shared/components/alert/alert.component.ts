/*
 * Alert Component
 *
 * This component is used for system-wide user messaging. Individual
 * components bubble up errors and display dismissable inline messages
 * to the user and alert them of important information.
 *
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type = 'error'; // TODO: implement ngClass to determine what type of message this alert is.
  @Input() header: String = '';
  @Input() message: String = '';
  @Input() ctaType: String = 'back';
  @Input() isInteractive: Boolean = false;
  @Output() action = new EventEmitter();

  /*
   * Alert Style Variants
   *
   * Multiline - Multiline alert, example use-case is "Attachments" within SR-Detail
   * Divider - Singleline alert, used on SR List, creates top border.
   * Modal - Singleline alert, used in all modals, creates bottom border.
   * Attachments - Singleline alert, used in attachments panel when the notification is one-line.
   */
  @Input() multiline: Boolean = false;
  @Input() divider: Boolean = false;
  @Input() modal: Boolean = false;
  @Input() attachments: Boolean = false;

  ctaClicked = () => {
    this.action.emit(this.ctaType);

    /**
     * TODO: implementation. This is a stop-gap for alpha release
     */
    if (this.ctaType === 'back') {
      window.history.back();
    }
  };

  getCtaText = () => {
    switch (this.ctaType) {
      case 'clear':
        return 'Dismiss';
      case 'cancel':
        return '';
      default:
        return 'Go Back';
    }
  };

  getIconName = () => {
    switch (this.ctaType) {
      case 'clear':
        return 'close';
      case 'cancel':
        return 'close';
      default:
        return 'return';
    }
  };
}
