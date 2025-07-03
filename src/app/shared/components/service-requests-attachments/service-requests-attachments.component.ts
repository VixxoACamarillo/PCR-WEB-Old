import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DateTimeService } from '../../services/datetime.service';
import { ErrorService } from '../../services/error.service';
/* Utils */
import { ObjectUtils } from '../../utils/object.utils';
import { CommonUtils } from '../../utils/common.utils';
/* Data model */
import { ServiceRequestDetailModel } from '../../services/models/service-request-detail';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-service-request-attachments',
  templateUrl: './service-requests-attachments.component.html',
  styleUrls: ['./service-requests-attachments.component.scss']
})
export class ServiceRequestsAttachmentsComponent implements OnInit, OnChanges {
  @Input() requirementLabelValue: string;
  @Input() srData: Observable<ServiceRequestDetailModel>;
  @Input() resolutionNotesVisible: boolean;
  @Input() attachmentsData: Observable<any>;
  @Input() serviceRequestNotes: Observable<any>;
  @Input() cancelUpload: boolean;
  @Output() additionalInfo = new EventEmitter();
  @Input() addText: string;
  @Input() tabIndex: number;
  @Output() dateChanged = new EventEmitter();
  @Output() attachmentUploadSuccess = new EventEmitter();
  @Output() deleteAttachment = new EventEmitter();
  @Output() fileToUpload = new EventEmitter();
  @Output() additionalText = new EventEmitter();
  @Output() resolutionNotesText = new EventEmitter();

  sortedAttachmentsData: any = [];
  serviceRequestResolutionNotes: any = [];
  isScrolled: Boolean = false;
  attachmentAlertContent: any;
  dateInHeader = '';
  attachmentForEditSection: any = [];
  isConfirmDeleteModalOpened = false;
  selectedIndex: any;
  fileUploadError = false;
  isImageLoading: Boolean = false;
  currentAttachments: any = [];
  uploadFileSubscription: any;
  public modalStatus: any;
  public srAttachmentsExtensionsMessage = {
    header: 'Attachment Upload Failed',
    message:
      'Accepted file types for attachments are ' +
      'gif,\n' +
      'jpeg,\n' +
      'jpg,\n' +
      'pdf,\n' +
      'png,\n' +
      'powerpoint,\n' +
      'spreadsheet,\n' +
      'tiff,\n' +
      'ms-excel,\n' +
      'word,\n' +
      'MSG,\n' +
      'EML.'
  };

  public uploadingAttachment: boolean = true;
  public index: number = 0;

  constructor(
    private store: Store<any>,
    private dateTimeService: DateTimeService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (this.serviceRequestNotes) {
      this.getResolutionNotes(this.serviceRequestNotes);
    }
    if (this.resolutionNotesVisible) {
      this.index = 1;
    }
    this.store.select('serviceRequestDetail').subscribe((state: any) => {
      this.alertUpdate(state);
    });
  }

  getResolutionNotes(serviceRequestNotes: any) {
    let resolutionNotes = serviceRequestNotes.filter(
      (d: any) => d.type.toLowerCase() === 'resolution'
    );
    this.serviceRequestResolutionNotes = _.orderBy(
      resolutionNotes,
      ['createdDate'],
      ['desc']
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachmentsData']) {
      this.uploadingAttachment = false;
      if (
        this.currentAttachments.length === 0 &&
        changes['attachmentsData'].currentValue &&
        changes['attachmentsData'].currentValue.length > 0
      ) {
        this.sortedAttachmentsData = this.currentAttachments =
        changes['attachmentsData'].currentValue;
      } else if (
        changes['attachmentsData'].currentValue &&
        changes['attachmentsData'].currentValue.length > 0
      ) {
        let newAttachments = ObjectUtils.diffSelection(
          this.currentAttachments,
          changes['attachmentsData'].currentValue,
          'key'
        );

        // Execute only when a new value is added to the attachment list
        if (newAttachments.length > 0) {
          // Now that we know for sure there is at least one new attachment
          //  we updated our list with this new attachment included

          this.sortedAttachmentsData = this.currentAttachments =
          changes['attachmentsData'].currentValue;
        }
      }

      if (
        changes['attachmentsData'].currentValue &&
        changes['attachmentsData'].currentValue.length > 0
      ) {
        this.attachmentForEditSection = changes['attachmentsData'].currentValue.filter(
          (d: any) => d.key
        );
      }
      if (this.sortedAttachmentsData.length) {
        this.changeHeaderOnScroll(0);
      }
    }
    if (changes['cancelUpload']) {
      this.cancelFileUpload();
    }
  }

  setAdditionalInfoField(event: any) {
    this.additionalText.emit(event.target.value);
  }

  onResolutionNotesText(event: any) {
    this.resolutionNotesText.emit(event);
  }

  onDeleteSelectedItem = (attachment: any) => {
    this.isConfirmDeleteModalOpened = true;
    const found = this.attachmentForEditSection.find(
      (ele: any) => ele.id === attachment.id
    );
    this.selectedIndex = this.attachmentForEditSection.indexOf(found);
  };

  onConfirmDelete(event: any) {
    if (event.status === 'change') {
      this.deleteAttachment.emit(this.selectedIndex);
    }
    this.isConfirmDeleteModalOpened = false;
    this.selectedIndex = null;
  }

  handleScroll = ($event: any) => {
    const scrollableChildren: any[] = $event.target.children;
    const scrollTop = $event.target.scrollTop;
    if (scrollableChildren.length > 1) {
      scrollableChildren.forEach((child: any, index: number) => {
        if (index === 0) {
          if (scrollTop > child.clientHeight) {
            this.changeHeaderOnScroll(1);
          } else {
            this.changeHeaderOnScroll(0);
          }
        } else if (scrollTop > child.offsetTop) {
          this.changeHeaderOnScroll(index);
        }
      });
    }
    this.isScrolled = scrollTop > 0;
  };

  onFileRead = (params: any) => {
    if (!this.uploadingAttachment) {
      this.uploadingAttachment = true;
    }
    let filename = CommonUtils.ReplaceSpecialChar(params.filename);
    const index = _.findIndex(
      this.sortedAttachmentsData,
      (a: any) => a.formattedDate === 'Today'
    );

    if (index >= 0) {
      // When we already have files attached TODAY. the we just add a new place holder for the appended file in the collection
      this.sortedAttachmentsData[index].attachments.unshift({
        id: 0,
        caption: filename,
        subType: 'preloaded'
      });
    } else {
      // We don't have yet a TODAY attachments collection so we need to create it
      this.sortedAttachmentsData.unshift({
        attachments: [
          {
            id: 0,
            caption: filename,
            subType: 'preloaded'
          }
        ],
        formattedDate: 'Today'
      });
    }

    this.fileToUpload.emit(params);
  };

  cancelCurrentFileUpload(gotCanceled: boolean) {
    this.uploadFileSubscription.unsubscribe();
    this.cancelFileUpload();
  }

  setFileUploadError = (fileUploadedError: boolean) => {
    this.fileUploadError = fileUploadedError;
  };

  /**
   * Remove from the Attachment list the files that were canceled or fail on the Upload proccess
   * It search for the Subtype 'preloaded'
   */
  private cancelFileUpload(): void {
    // This block will delete any temporary appended file (spinner) in this.sortedAttachmentsData with SUBTYPE 'preloaded'
    const index = _.findIndex(
      this.sortedAttachmentsData,
      (a: any) => a.formattedDate === 'Today'
    );
    if (index >= 0) {
      _.remove(
        this.sortedAttachmentsData[index].attachments,
        (a: any) => a.subType === 'preloaded'
      );

      // Once we have deleted the last temporary attachment with SUBTYPE 'preloaded' if there is no other attached file
      //  in the 'Today' collection we delete it
      if (this.sortedAttachmentsData[index].attachments.length === 0) {
        _.remove(
          this.sortedAttachmentsData,
          (a: any) => a.formattedDate === 'Today'
        );
      }
    }
    this.fileUploadError = true;
  }

  alertUpdate = (state: any) => {
    const attachment: any = [];
    const fileUpload: any = [];
    if (state) {
      state = { attachment, fileUpload };
    }

    // catches file endpoint error
    if (fileUpload.error) {
      this.cancelFileUpload();

      // Handle error and display information to the user
      const error = this.srAttachmentsExtensionsMessage;
      this.attachmentAlertContent = this.errorService.getErrorMessaging(
        {
          status:
            fileUpload.error.status === 413 ? fileUpload.error.status : -1,
          statusMessage: fileUpload.error.statusText
        },
        error.message,
        error.header
      );

      // catches attachment endpoint error
    } else if (attachment.error) {
      this.cancelFileUpload();

      // Handle error and display information to the user
      this.attachmentAlertContent = this.errorService.getErrorMessaging(
        attachment.error
      );

      // error cleared
    } else {
      this.attachmentAlertContent = undefined;
    }
  };

  onAlertDismissAction = () => {
    this.attachmentAlertContent = undefined;
  };

  parseFileNameFromKey = (key: string) => {
    return !key || key.length <= 36 ? '' : key.substr(36);
  };

  parseFileExtensionFromKey = (key: string) => {
    if (!key || key.length <= 36) {
      return '';
    }
    const fileName = key;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    return extension ? extension : '';
  };

  isImageFileExtension = (extension: string) => {
    const imgExtensions = ['PNG', 'JPG', 'JPEG', 'GIF'];
    return imgExtensions.includes(extension.toUpperCase());
  };

  changeHeaderOnScroll(index: number): void {
    const formattedDate = this.sortedAttachmentsData[index].formattedDate;

    this.dateChanged.emit(formattedDate);
    this.dateInHeader = formattedDate;
  }

  /**
   * TODO: not implemented - specific handling of events emitted from error overlays
   */
  onAlertAction = (cta: string) => console.log(cta);

  getFormattedDateTime(date?: any, timeZone?: any) {
    if (date && timeZone) {
      return `${this.dateTimeService.getSiteDateTime(
        new Date(date),
        timeZone
      )} ${timeZone}`;
    } else if (date && !timeZone) {
      return `${this.dateTimeService.getDateTime(date)}`;
    }
    return '';
  }
}
