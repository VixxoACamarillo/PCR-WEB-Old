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
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() messageText: String = '';
  @Output() accept = new EventEmitter();
  @Output() decline = new EventEmitter();

  onSubmitClick() {
    this.accept.emit();
  }
  onDeclineClick() {
    this.decline.emit();
  }
}
