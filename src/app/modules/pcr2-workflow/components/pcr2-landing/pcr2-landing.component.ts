import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Part } from '../../../../model/overview-model';
import { PartLocation } from '../../../../model/parts-location-model';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { PcrData, PcrDto, SavePcrData } from '../../../../model/pcr-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PcrService } from '../../../../service/pcr.service';
import { ServicerequestService } from '../../../..//service/servicerequest.service';
import { ServiceRequestAttachment } from '../../../..//shared/services/models/service-request-attachment.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-pcr2-landing',
  templateUrl: './pcr2-landing.component.html',
  styleUrls: ['./pcr2-landing.component.scss']
})
export class Pcr2LandingComponent implements OnInit {
  public selectedTab: number = 0;
  public isNextButtonDisabled: boolean = false;
  public isPartsSelectionValidated: boolean;
  public isPathActionCauseSelected: boolean = false;
  public isOverviewValidated: boolean = true;
  public isPcrScreen: boolean = false;
  private serviceRequestNumber: string;
  private assetId: string;
  public savePcrData: SavePcrData = {
    serviceRequestNumber: '',
    pcrData: []
  };
  public loader: boolean = false;
  public disableNotesTab: boolean = false;
  public disablePcrTab: boolean = false;
  public disableOverviewTab: boolean = false;
  public data: PartLocation[];

  constructor(
    private pcrService: PcrService,
    private localStorageService: LocalStorageService,
    private serviceRequestservice: ServicerequestService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.serviceRequestNumber = this.activatedRoute.snapshot.params['serviceRequestNumber'];
    this.assetId = this.activatedRoute.snapshot.params['assetId'];

    this.data = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );

    this.isPathActionCauseSelected = this.data
      ? this.data.filter(
          (item: PartLocation) =>
            !item.cause || !item.cause.causeId || isNaN(item.cause.causeId)
        ).length == 0
      : false;
  }

  ngAfterViewChecked() {
    let parts = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      )
    );

    this.data = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );

    this.disablePcrTab = parts && parts.length ? false : true;

    if (this.data && this.data.length == 0) {
      this.disableOverviewTab = this.disableNotesTab = true;
    } else if (parts && this.data && parts.length > this.data.length) {
      this.disableOverviewTab = this.disableNotesTab = true;
    } else if (
      !this.disablePcrTab &&
      this.data &&
      this.isPathActionCauseSelected
    ) {
      this.disableOverviewTab =
        this.data.filter(
          (item: PartLocation) =>
            !item.cause || !item.cause.causeId || isNaN(item.cause.causeId)
        ).length > 0;

      this.disableNotesTab = this.disableOverviewTab
        ? this.disableOverviewTab
        : this.data.filter(
            part =>
              part.action &&
              part.action.actionName &&
              part.action.actionName.toLowerCase() === 'replaced' &&
              (part.overviewPartQuantity == 0 || !part.overviewPartQuantity)
          ).length > 0;
    } else if (
      !this.disablePcrTab &&
      this.data &&
      !this.isPathActionCauseSelected
    ) {
      this.disableOverviewTab = this.disableNotesTab = true;
    } else {
      this.disableNotesTab = this.disableOverviewTab = this.data
        ? this.data.filter(
            (item: PartLocation) =>
              !item.cause || !item.cause.causeId || isNaN(item.cause.causeId)
          ).length == 0
        : true;
    }

    this.changeDetectorRef.detectChanges();
  }

  onNext() {
    this.selectedTab = this.selectedTab + 1;
    if (this.selectedTab == 2) {
      this.isNextButtonDisabled = true;
    }
    if (this.selectedTab == 3) {
      this.checkOverviewQuantity();
    }
  }

  onTabClicked(tabIndex: number): void {
    if (tabIndex == 0) {
      this.selectedTab = tabIndex;
    } else if (
      tabIndex == 1 &&
      this.isPartsSelectionValidated &&
      !this.disablePcrTab
    ) {
      this.selectedTab = tabIndex;
    } else if (
      tabIndex == 3 &&
      this.isPartsSelectionValidated &&
      this.isPathActionCauseSelected &&
      !this.disableOverviewTab
    ) {
      this.selectedTab = tabIndex;
    } else if (
      tabIndex == 4 &&
      this.isPartsSelectionValidated &&
      this.isPathActionCauseSelected &&
      this.isOverviewValidated &&
      !this.disableOverviewTab
    ) {
      this.selectedTab = tabIndex;
    }
  }

  onDone() {
    if (this.selectedTab !== 4) {
      return;
    }
    this.loader = true;
    // attach photos to SR
    const attachments = <ServiceRequestAttachment[]>(
      JSON.parse(
        this.localStorageService.readLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.ServiceRequestAttachments
        )
      )
    );

    if (attachments) {
      attachments.forEach(attachment =>
        this.serviceRequestservice
          .addAttachment(this.serviceRequestNumber, attachment.key, 'pcr')
          .subscribe()
      );
    }

    // attach note to SR
    const note = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.Note
    );

    if (note) {
      this.serviceRequestservice
        .addNote(this.serviceRequestNumber, note, 'pcr')
        .subscribe();
    }

    let partLocations = <PartLocation[]>(
      JSON.parse(
        this.localStorageService.readLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.ApiResponse
        )
      )
    );

    const pcrData: PcrData[] = partLocations
      .filter(
        (partLocation) =>
          partLocation.action &&
          partLocation.cause &&
          ((partLocation.pcrLocationPaths &&
            partLocation.pcrLocationPaths.find(
              (partInfo) => partInfo.isSelected && !!partInfo.partLocationId
            )) ||
            (partLocation.pcrLocationPaths && partLocation.pcrLocationPaths.length == 0 &&
              partLocation.partLocationId))
      )
      .map((partLocation) => {
        let partInfo = partLocation.pcrLocationPaths.find(
          (partInfo) => partInfo.isSelected && !!partInfo.partLocationId
        );
        return {
          partId: partLocation.partId,
          actionId: partLocation.action.actionId,
          causeId: partLocation.cause.causeId,
          partLocationId:
            partInfo && partInfo.partLocationId
              ? partInfo.partLocationId
              : partLocation.partLocationId,
          serviceRequestNumber: this.serviceRequestNumber,
          isProactiveFix: partLocation.isProactiveFix,
          isReportedFix: partLocation.isReportedFix,
          overviewPartQuantity: partLocation.overviewPartQuantity
        };
      });

    pcrData.forEach((element) => {
      let pcrDto = <PcrDto>{
        partId: element.partId,
        actionId: element.actionId,
        causeId: element.causeId,
        partLocationId: element.partLocationId,
        resolutionType: element.isProactiveFix
          ? 'proactive'
          : element.isReportedFix
          ? 'resolved'
          : null,
        partQuantity: element.overviewPartQuantity
      };
      this.savePcrData.pcrData.push(pcrDto);
    });

    this.savePcrData.serviceRequestNumber = pcrData[0].serviceRequestNumber;

    this.pcrService.postPcr2(this.savePcrData).subscribe(resp => {
      this.clearAllLocalStorage();
      window.location.href =
        window.origin + `/servicerequest/${this.serviceRequestNumber}/success`;
      this.loader = false;
    });
  }

  clearAllLocalStorage() {
    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ApiResponse
    );
    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ServiceRequestAttachments
    );
    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.Note
    );

    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.MachineProductId
    );

    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.SelectedParts
    );

    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ServiceRequestObject
    );
    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ServiceRequestIssue
    );
  }

  onBack() {
    this.selectedTab--;
    if (this.selectedTab == 2) {
      this.isNextButtonDisabled = true;
    }
  }

  onOverviewClick() {
    this.isPcrScreen = false;

    let partData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );
    const index = partData.findIndex(
      (part: PartLocation) =>
        part.action &&
        part.action.actionName &&
        part.action.actionName.toLowerCase() === 'replaced' &&
        (part.overviewPartQuantity == 0 ||
          !part.overviewPartQuantity ||
          part.overviewPartQuantity == null)
    );
    if (index > -1) {
      this.isNextButtonDisabled = false;
      this.isOverviewValidated = false;
      this.disableNotesTab = true;
    } else {
      this.isNextButtonDisabled = true;
      this.isOverviewValidated = true;
      this.disableNotesTab = false;
    }
  }

  checkOverviewQuantity() {
    let partData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );
    if (partData) {
      partData.forEach((part: PartLocation) => {
        if (
          part.action &&
          part.action.actionName &&
          part.action.actionName.toLowerCase() === 'replaced' &&
          !part.overviewPartQuantity
        ) {
          part.overviewPartQuantity = 0;
        }
      });
      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse,
        JSON.stringify(partData)
      );
    }
    this.onOverviewClick();
  }

  OnPartsSelected(event: any) {
    this.isNextButtonDisabled = event.isPartSelected;
    if (!this.isNextButtonDisabled) {
      this.isPartsSelectionValidated = false;
    } else {
      this.isPartsSelectionValidated = true;
    }
  }

  disableNextButton(event: any) {
    this.isNextButtonDisabled = event.isPathActionCauseSelected;
    if (this.isNextButtonDisabled) {
      this.isPathActionCauseSelected = true;
    } else {
      this.isPathActionCauseSelected = false;
    }
  }
}
