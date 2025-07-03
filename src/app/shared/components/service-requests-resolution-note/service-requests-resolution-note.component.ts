import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateTimeService } from '../../services/datetime.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-service-request-resolution-note',
  templateUrl: './service-requests-resolution-note.component.html',
  styleUrls: ['./service-requests-resolution-note.component.scss']
})
export class ServiceRequestsResolutionNoteComponent implements OnInit {
  @Output() resolutionNotesText = new EventEmitter();
  @Input() serviceRequestResolutionNotes: any;
  @Input() resolutionNotesVisible: boolean = false;
  @Input() srData: any;
  resolutionNoteDate?: string;
  resolutionNoteText: string;

  constructor(public dateTimeService: DateTimeService) {}

  ngOnInit() {
    if (this.serviceRequestResolutionNotes.length > 0) {
      this.resolutionNoteDate = this.getFormattedDateTime(
        this.serviceRequestResolutionNotes[0].createdDate,
        this.srData.site.timezone
      ) as any;
      this.resolutionNoteText = this.serviceRequestResolutionNotes[0].text;
    }
  }

  getFormattedDateTime(date?: any, timeZone?: any) {
    if (date && timeZone) {
      return `${this.dateTimeService.getSiteDateTime(
        new Date(date),
        timeZone
      )} ${timeZone}`;
    } else if (date && !timeZone) {
      return `${this.dateTimeService.getDateTime(date)}`;
    }
    return false;
  }
  setResolutionNotes(event: any) {
    this.resolutionNotesText.emit(event.target.value);
  }
}
