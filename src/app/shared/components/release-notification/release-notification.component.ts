import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-notification',
  templateUrl: './release-notification.component.html',
  styleUrls: ['./release-notification.component.scss']
})
export class ReleaseNotificationComponent {
  @Input() messageText: String = '';
  @Output() release = new EventEmitter();

  onSubmitClick() {
    this.release.emit();
  }
}
