import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  FileState,
  SelectEvent,
  UploadComponent,
  UploadEvent
} from '@progress/kendo-angular-upload';
import { environment } from '../../../../environments/environment';
import { CommonUtils } from '../../utils/common.utils';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-upload-attachment',
  providers: [],
  templateUrl: './upload-attachment.component.html',
  styleUrls: ['./upload-attachment.component.scss']
})
export class UploadAttachmentComponent {
  private proxyAPIUrl = environment.proxyApi;
  public uploadSaveUrl = `${this.proxyAPIUrl}/file`;
  public uploadProgress: Number = 0;
  public pendingUpload: boolean = false;
  public filename: string;

  @ViewChild('fileUpload', { static: false }) fileUpload: UploadComponent;

  @Input() editInvoice: boolean;
  @Input() padding: string;
  @Input() uploadingAttachment: boolean = true;
  @Output() onFileRead = new EventEmitter();

  public positionButtons() {
    return this.editInvoice
      ? {
          'justify-content': 'left',
          padding: '40px 30px 40px 10px'
        }
      : {
          'justify-content': 'center',
          padding: this.padding ? this.padding : '40px 30px 40px 40px'
        };
  }

  public selectEventHandler(event: SelectEvent): void {
    this.pendingUpload = true;
    this.uploadProgress = 0;
    const self = this;
    let _filename: string;
    event.files.forEach((file: any) => {
      if (!file.validationErrors) {
        this.filename = _filename = file.rawFile
          ? CommonUtils.ReplaceSpecialChar(file.rawFile.name)
          : '';
        const reader = new FileReader();
        reader.onload = function(e: any) {
          self.onFileRead.emit({
            filename: _filename,
            file: e.target.result.replace(/^data:[a-z\^\/\.\-]+;base64,/, ''),
            description: _filename,
            size: e.total
          });
        };
        reader.readAsDataURL(file.rawFile);
      } else {
        console.error('error handler is going to be here.');
      }
    });
  }

  constructor() {}

  public formatBytes(bytes: number) {
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
  }

  public formatExtension(extension: string, file: string) {
    // Remove the leading dot
    return extension.replace(/^\./, '');
  }
}
