import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, pluck, tap } from 'rxjs/operators';
import { VixxoApiService } from '../../services/vixxo-api.service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {
  @Input() data: any;
  @Output() updateAssetId = new EventEmitter();
  public asset$: Observable<any>;
  public serviceItemId: string;
  public assetId: string;
  public includeAsset = true;

  constructor(public vixxoApiService: VixxoApiService) {}
  ngOnInit() {
    // ** uncomment this after service items api is finished **
    // this.asset$ = this.vixxoApiService
    //   .getServiceItems(this.data.serviceRequestNumber)
    //   .pipe(
    //     map((i: any) => i.find((x: any) => x.asset.isActive)),
    //     tap(serviceItem => {
    //       this.serviceItemId = serviceItem ? serviceItem.id : null;
    //       this.assetId =
    //         serviceItem && serviceItem.asset ? serviceItem.asset.id : null;
    //       this.updateAssetId.emit(this.assetId);
    //       console.log(serviceItem);
    //     }),
    //     pluck('asset'),
    //     concatMap(asset => this.vixxoApiService.getAssetInfo(asset.id)),
    //     catchError(() => of(null))
    //   );

    // ** test data until service items api is finished **
    this.asset$ = this.vixxoApiService.getAssetInfo('400399').pipe(
      tap(asset => {
        this.updateAssetId.emit(400399);
      })
    );
  }

  public onRemove() {
    if (this.includeAsset) {
      this.vixxoApiService.getLineItems(this.data.id).subscribe(lineItems => {
        const lineItem = lineItems.lineItemDetails.find(
          (item: any) => item.assetId === this.assetId
        );
        if (lineItem) {
          this.vixxoApiService
            .deleteLineItem(this.data.id, lineItem.id)
            .subscribe();
        }
        this.includeAsset = false;
      });
    }
  }
}
