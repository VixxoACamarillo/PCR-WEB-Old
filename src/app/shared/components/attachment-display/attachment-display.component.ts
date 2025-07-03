import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-attachment-display',
  templateUrl: './attachment-display.component.html',
  styleUrls: ['./attachment-display.component.scss']
})
export class AttachmentDisplayComponent implements OnInit, OnChanges {
  @Input() isQuote: boolean;
  @Input() attachmentsData: Observable<any>;
  @Output() deleteAttachment = new EventEmitter();
  @Input() isInvoiceReview: boolean;
  public currentAttachments: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachmentsData']) {
      if (
        changes['attachmentsDat'].currentValue &&
        changes['attachmentsData'].currentValue.length > 0
      ) {
        this.currentAttachments = changes['attachmentsData'].currentValue;
        this.checkAttachmentsLength();
      }
    }
  }

  openFileNewTab(attachment: any) {
    let url = '';
    if (attachment.url) {
      url = attachment.url;
    } else {
      url = this.constructUrl(
        attachment.cloudStorageId,
        attachment.cloudStorageContainerName,
        attachment
      );
    }
    window.open(url, '_blank');
  }

  constructUrl = (
    cloudStorageId: string,
    cloudStorageContainerName: string,
    attachment: any
  ) => {
    attachment.url =
      'https://' +
      cloudStorageContainerName +
      '.s3.amazonaws.com/' +
      cloudStorageId;
    return attachment.url;
  };

  displayAttachmentSize(size: any) {
    return size > 0;
  }

  checkAttachmentsLength() {
    if (this.currentAttachments) {
      return this.currentAttachments.length > 1;
    }
    return false;
  }

  parseFileExtensionFromKeyInvoice = (key: string) => {
    if (!key || key.length <= 36) {
      return '';
    }
    const fileName = key;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    return extension ? extension : '';
  };

  parseFileExtensionFromKey = (key: string) => {
    if (!key) {
      return '';
    }
    const fileParts: any = key.split('.', 2);
    const extension = fileParts[1];
    return extension ? extension : '';
  };

  parseFileNameFromKeyInvoice = (key: string) => {
    if (!key || key.length <= 36) {
      return '';
    }
    return key.substr(36);
  };

  isImageFileExtension = (extension: string) => {
    extension = extension.toUpperCase();
    return (
      extension === 'PNG' ||
      extension === 'JPG' ||
      extension === 'JPEG' ||
      extension === 'GIF'
    );
  };

  isInvoiceAttachment = (attachment: any) => {
    return attachment.invoiceId;
  };

  formatBytes = (bytes: number) => {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    let formattedBytes;
    if (i > 1) {
      formattedBytes = `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${
        sizes[i]
      }`;
    } else {
      formattedBytes = `${parseFloat((bytes / Math.pow(k, i)).toFixed(0))} ${
        sizes[i]
      }`;
    }
    return formattedBytes;
  };

  parseFileNameFromKey = (key: string) => {
    return !key || key.length <= 36 ? '' : key.substr(36);
  };

  remove = (attachment: any) => {
    this.deleteAttachment.emit(attachment);
  };
}
