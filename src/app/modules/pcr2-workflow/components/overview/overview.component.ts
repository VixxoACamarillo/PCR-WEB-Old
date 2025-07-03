import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PartLocation } from '../../../../model/parts-location-model';
import { Overview, Part } from '../../../../model/overview-model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Output() submission = new EventEmitter<Part>();

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}
  public overviewModel: Overview[] = [];
  public partData: PartLocation[];
  private serviceRequestNumber: string;
  private assetId: string;

  ngOnInit() {
    this.serviceRequestNumber = this.route.snapshot.params['serviceRequestNumber'];
    this.assetId = this.route.snapshot.params['assetId'];
    this.partData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );
    if (this.partData) {
      let actionGroupBy = this.findDistinctAction(this.partData);
      actionGroupBy.forEach((action: any) => {
        let overview = {
          actionName: action.actionName,
          parts: this.findPartsByAction(this.partData, action.actionName)
        };
        this.overviewModel.push(overview);
      });
    }
  }

  findDistinctAction(partData: any) {
    return partData
      .filter(
        (v: any, i: any, a: any) =>
          a.findIndex(
            (v2: any) => v2.action.actionName === v.action.actionName
          ) === i
      )
      .map((ele: any) => ele.action);
  }

  findPartsByAction(partData: any, action: string): Part[] {
    let parts: Part[] = [];
    partData.forEach((element: any) => {
      if (element.action.actionName === action) {
        let part = {
          name: element.partName,
          number: element.partNumber,
          sku: element.skuNumber,
          isProactiveFix: element.isProactiveFix,
          isReportedFix: element.isReportedFix,
          cause: element.cause,
          copyId: element.copyId,
          overviewPartQuantity:
            action &&
            action.toLowerCase() == 'replaced' &&
            element.overviewPartQuantity >= 0
              ? element.overviewPartQuantity
              : 1
        };
        parts.push(part);
      }
    });
    parts = _.sortBy(parts, 'partName');
    return parts;
  }

  onKeyDown(part: Part) {
    this.updateLocalStorage(part);
    this.submission.emit(part);
  }

  onKeyPress(event: any) {
    const key = String.fromCharCode(event.keyCode);
    if (key == '.') {
      event.preventDefault();
    }
  }

  updateLocalStorage(updatedPart: any) {
    const index = this.partData.findIndex(
      (part: PartLocation) =>
        part?.action?.actionName.toLowerCase() === 'replaced' &&
        part.partNumber == updatedPart.number &&
        part.copyId == updatedPart.copyId
    );

    if (index > -1) {
      this.partData[
        index
      ].overviewPartQuantity = updatedPart.overviewPartQuantity
        ? updatedPart.overviewPartQuantity
        : 0;
    }

    this.localStorageService.writeLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ApiResponse,
      JSON.stringify(this.partData)
    );
  }
}
