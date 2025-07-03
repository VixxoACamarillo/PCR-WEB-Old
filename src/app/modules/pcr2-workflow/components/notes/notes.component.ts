import { Component, OnInit } from '@angular/core';
import { FileUploadResult } from '../../../../shared/services/models/fileUploadResult.model';
import { VixxoApiService } from '../../../../shared/services/vixxo-api.service';
import { ServiceRequestAttachment } from '../../../../shared/services/models/service-request-attachment.model';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ServiceRequestDetailModel } from '../../../../shared/services/models/service-request-detail';
import { BytesDisplayPipe } from '../../../../shared/pipes/bytes-display.pipe';
import { SupportedFileType } from './models/supported-type.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private readonly maxFileSizeInBytes: number = 7864320;
  private maxSize: string;
  private allowedTypes: Array<string>;

  public serviceRequestNumber: string;

  public attachmentsData: Array<any> = new Array<any>();
  public cancelFileUpload = false;

  public showFileUploadModal: Boolean = false;
  public showLargeFile: Boolean = false;
  public currentServiceRequest: ServiceRequestDetailModel;

  public loader: boolean = false;
  public openAddNoteModal: boolean = false;
  public enteredNote: string;
  public savedNote: string;
  public errorMessage = { message: '' };
  public sizeErrorMessage = { message: '' };
  private assetId: string;
  constructor(
    private vixxoAPIService: VixxoApiService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    let converter: BytesDisplayPipe = new BytesDisplayPipe();
    this.maxSize = converter.transform(this.maxFileSizeInBytes);
    this.sizeErrorMessage.message =
      'Uploads must be less than ' +
      this.maxSize +
      ', please try uploading a smaller file.';

    this.errorMessage.message = 'Accepted file types for attachments are ';
    let typeNames: Array<string> = this.supportedTypes.map(
      type => type.typeName
    );
    let typeNamesDisplay: string = typeNames.join(', ');
    this.errorMessage.message += typeNamesDisplay + '.';

    this.allowedTypes = [].concat(
      ...this.supportedTypes.map((type) => type.typeExtensions)
    );
  }

  private readonly supportedTypes: Array<SupportedFileType> = [
    new SupportedFileType('jpeg', ['jpeg']),
    new SupportedFileType('jpg', ['jpg']),
    new SupportedFileType('png', ['png']),
    new SupportedFileType('tiff', ['tiff']),
    new SupportedFileType('heic', ['heic'])
  ];

  public ngOnInit() {
    this.loader = true;
    this.serviceRequestNumber = this.route.snapshot.params['serviceRequestNumber'];
    this.assetId = this.route.snapshot.params['assetId'];

    let serializedServiceRequest: string = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ServiceRequestObject
    );
    this.currentServiceRequest = <ServiceRequestDetailModel>(
      JSON.parse(serializedServiceRequest)
    );
    this.savedNote = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.Note
    );

    this.attachmentsData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ServiceRequestAttachments
      )
    );

    if (this.attachmentsData == null) {
      this.attachmentsData = [];
    }

    this.loader = false;
  }

  addNote() {
    this.openAddNoteModal = true;
  }

  closeAddNoteModal(close: any) {
    if (close.status === 'change') {
      this.savedNote = this.enteredNote;
      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.Note,
        this.enteredNote
      );
    }
    this.openAddNoteModal = false;
  }

  setPcrNotes(event: any) {
    this.enteredNote = event.target.value;
  }

  private onFileRead(params: any) {
    let srNumber = this.serviceRequestNumber;
    let fileSize = params.size;
    let fileExtension = params.filename
      .substring(params.filename.lastIndexOf('.') + 1)
      .toLowerCase();
    if (fileSize > this.maxFileSizeInBytes) {
      this.showLargeFile = true;
      this.cancelFileUpload = true;
    } else if (this.allowedTypes.indexOf(fileExtension) < 0) {
      this.showFileUploadModal = true;
      this.cancelFileUpload = true;
    } else {
      this.vixxoAPIService.uploadFile(srNumber, params).subscribe(
        (res: FileUploadResult) => {
          let newAttachment: ServiceRequestAttachment = new ServiceRequestAttachment();
          (newAttachment.url = res.location),
            (newAttachment.key = res.key),
            (newAttachment.id = '0');

          this.cleanAttachments();

          this.attachmentsData = this.attachmentsData.concat([newAttachment]);
          this.localStorageService.writeLocalStorage(
            `${this.serviceRequestNumber}-${this.assetId}-${
              LocalStorageKeys.ServiceRequestAttachments
            }`,
            JSON.stringify(this.attachmentsData)
          );
        },
        (uploadError: any) => {
          this.cancelFileUpload = true;
        }
      );
    }
  }

  public close(event: any): void {
    this.showFileUploadModal = false;
    this.showLargeFile = false;
    this.cancelFileUpload = true;
    this.cleanAttachments();
    this.attachmentsData = this.attachmentsData.slice();
  }

  private cleanAttachments() {
    if (
      this.attachmentsData &&
      this.attachmentsData.length > 0 &&
      this.attachmentsData[0].attachments != undefined
    ) {
      this.attachmentsData.shift();
    }
  }
}
