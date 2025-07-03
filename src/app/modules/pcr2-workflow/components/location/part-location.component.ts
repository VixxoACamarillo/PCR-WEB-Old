import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

import {
  PartInformation,
  PartLocation
} from '../../../../model/parts-location-model';

@Component({
  selector: 'app-location',
  templateUrl: './part-location.component.html',
  styleUrls: ['./part-location.component.scss']
})
export class PartLocationComponent implements OnInit {
  @Input() levelInfo: PartInformation[];
  @Input() locationResponse: PartLocation[];
  @Input() copyId: number;
  @Output() selectedPart = new EventEmitter<any>();
  public levelHierarchy: boolean[] = [];
  private serviceRequestNumber: string;
  private assetId: string;
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.serviceRequestNumber = this.route.snapshot.params['serviceRequestNumber'];
    this.assetId = this.route.snapshot.params['assetId'];
  }

  ngDoCheck() {
    if (this.levelInfo && this.levelInfo.length > 0) {
      this.loadLocation();
    }
  }

  display(): boolean {
    const index = this.levelInfo.findIndex(part => part.isSelected);
    return index > -1;
  }

  onClick(part: any) {
    const index = this.levelInfo.findIndex(p => p.id === part.id);
    this.levelInfo[index].isSelected = true;
    this.selectedPart.emit(part);
  }

  loadLocation() {
    this.levelInfo.forEach((partLevel: PartInformation) => {
      this.levelHierarchy = [];
      let checkAllLocationByPartId = this.isPartLocationSelected(
        partLevel,
        this.copyId
      );
      let partLocationExists = !checkAllLocationByPartId.includes(false);
      partLevel.isAreaPathAlreadySelected = partLevel.isAreaPathLevelPartialSelect
        ? false
        : partLocationExists;
    });
  }

  isPartLocationSelected(part: PartInformation, copyId: number): boolean[] {
    if (part.partLocationId == null) {
      let getPartByPartIdCopyId = this.locationResponse.filter(
        (res: PartLocation) => res.partId == part.partid && res.copyId == copyId
      );

      let getLocationbyPartIdLevelId = getPartByPartIdCopyId[0]?.pcrLocationPaths?.filter(
        (partInformation: PartInformation) =>
          partInformation.level === part.level + 1 &&
          partInformation.parentId === part.partUiPathId &&
          partInformation.partUiPath === part.partUiPath
      );

      getLocationbyPartIdLevelId?.forEach(k => {
        this.isPartLocationSelected(k, copyId);
      });
    } else {
      let localStorageData = JSON.parse(
        this.localStorageService.readLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.ApiResponse
        )
      );
      if (localStorageData && localStorageData.length > 0) {
        let getPathFormed = localStorageData
          .filter((res: PartLocation) => res.partId == part.partid)
          .map((pf: PartLocation) => pf.pathFormed);
        let partLocationExists =
          getPathFormed.length > 0
            ? getPathFormed.filter(
                (a: number[]) =>
                  a.toString().replace(/,/gi, '\\') === part.partUiPath
              )
            : [];
        if (partLocationExists && partLocationExists.length > 0) {
          this.levelHierarchy.push(true);
        } else {
          this.levelHierarchy.push(false);
        }
      } else {
        this.levelHierarchy.push(false);
      }
    }
    return this.levelHierarchy;
  }
}
