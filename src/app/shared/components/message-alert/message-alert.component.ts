/*
 * Alert Component
 *
 * This component is used for system-wide user messaging.
 * System automatically detect changes and print the last error
 *
 */

// Angular
import { Component, ViewEncapsulation } from '@angular/core';
// Service
import { NotifierService } from '../../services/notifier.service';
import { AlertType } from '../../model/alert.model';
import { ErrorService } from '../../services/error.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent {
  public loadMessage = false;
  public header = '';
  public message = '';

  constructor(
    private notifierService: NotifierService,
    private errorService: ErrorService
  ) {
    this.eventListeners();
  }

  /**
   * Register Global Listeners
   */
  eventListeners() {
    this.notifierService.on(AlertType.ERROR, (event: any) => {
      let error = this.errorService.getErrorMessaging(event.message);
      this.header = error.header;
      this.message = error.message;
      this.loadMessage = true;
    });
  }

  public clearMessage(): void {
    this.header = '';
    this.message = '';
    this.loadMessage = false;
  }
}
