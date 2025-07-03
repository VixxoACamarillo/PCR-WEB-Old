import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { SelectableSettings } from '@progress/kendo-angular-grid';
import { PartService } from '../../../../service/parts.service';
import { PartsSearchModel } from '../../../../model/parts-search-model';
import { AddPartsColumnsModel } from '../../../../model/add-parts-columns-model';
import { Subject } from 'rxjs';
import { PartModel } from '../../../../model/part.model';
import { PartFilterModel } from '../../../../model/part-filter.model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  public subject: Subject<string> = new Subject();
  public searchFilter = '';
  public isDataLoading = false;
  public partModel: PartModel[] = [];
  public partsData: any = { results: [], paging: {} };
  public selectedParts: PartModel[] = [];
  public selectedItems: PartModel[] = [];
  public selectedPartFilter!: PartFilterModel;
  public columnsModel = new AddPartsColumnsModel();
  public openInputFilterList = false;
  public endOfResults = false;
  public searchString: string = '';
  public onInitialLoad: boolean = false;
  public partSearchModel: PartsSearchModel = {
    pageNumber: 1,
    pageSize: 100
  };
  public selectableSettings: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    checkboxOnly: true
  };
  private serviceRequestNumber: string;
  private assetId: string;
  private cellClicked: boolean = false;
  private existingPartsResult: PartModel[] = [];

  @Output() PartSelected = new EventEmitter<{ isPartSelected: boolean }>();

  innerWidth: number;

  constructor(
    private partService: PartService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.serviceRequestNumber = this.route.snapshot.params['serviceRequestNumber'];
    this.assetId = this.route.snapshot.params['assetId'];
    let storageData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      ) || '[]'
    );
    if (storageData && storageData.length) {
      this.onInitialLoad = true;
    }
    this.addOrUpdateSearchParams();
    this.getParts();
    this.innerWidth = window.innerWidth;
  }
  //Adding headers for part number and sku on screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.partsData.results.length > 0) {
      this.partModel = [];
      this.partsData.results.forEach((value: any) => {
        if (this.innerWidth <= 984) {
          value.partNumber = 'Part #: ' + value.number;
          value.skuNumber = value.sku.map((snum: any) => 'SKU: ' + snum);
        } else {
          value.partNumber = value.number;
          value.skuNumber = value.sku;
        }
      });
      this.partModel = this.partsData.results;
      let distinctPartsModel: PartModel[] = Object.values(
        this.partModel.reduce((a, b) => {
          if (!a[b.partNumber]) a[b.partNumber] = b;
          return a;
        }, {})
      );
      this.partModel = distinctPartsModel;
      this.getSelectedDatatoBindtoGrid();
      this.disableandEnableButton();
    } else {
      this.getParts();
    }
  }

  public getParts() {
    this.isDataLoading = true;

    this.partService
      .getPartsByParam(this.partSearchModel)
      .subscribe((response: any) => {
        if (response && response.results && response.results == 0) {
          this.endOfResults = true;
          this.partSearchModel.pageNumber = response.totalPages;
          if (this.isDataLoading) {
            this.isDataLoading = false;
          }
        } else {
          if (response && response.results && response.results.length < 99) {
            this.isDataLoading = false;
            this.endOfResults = true;
          } else {
            this.endOfResults = false;
            this.isDataLoading = false;
          }
          this.existingPartsResult = this.partModel;
          this.partModel = [];
          this.partsData.results = [];

          this.partsData.results = response.results;
          if (this.partsData && this.partsData.results) {
            this.partsData.results.forEach((value: any) => {
              if (this.innerWidth <= 984) {
                value.partNumber = 'Part #: ' + value.number;
                value.skuNumber = value.sku.map((snum: any) => 'SKU: ' + snum);
              } else {
                value.partNumber = value.number;
                value.skuNumber = value.sku;
              }
            });
            if (this.existingPartsResult && this.existingPartsResult.length) {
              this.partModel = [
                ...this.existingPartsResult,
                this.partsData.results
              ];

              let partModel = [].concat.apply([], this.partModel);
              let distinctPartsModel: PartModel[] = Object.values(
                partModel.reduce(
                  (a: PartModel[], b: { number: string | number }) => {
                    if (!a[b.number]) a[b.number] = b;
                    return a;
                  },
                  {}
                )
              );

              this.partModel = distinctPartsModel;
            } else {
              this.partModel = this.partsData.results;
            }

            this.partsData.paging = response.paging;
            this.getSelectedDatatoBindtoGrid();
          }
        }
      });
  }

  public selectedRowChange(dataItem: any): void {
    if (dataItem.selectedRows.length) {
      const indexOfClickedItem = this.selectedParts.findIndex(function(o) {
        return o.id === dataItem.selectedRows[0].dataItem.id;
      });
      if (indexOfClickedItem > -1) {
        this.selectedParts.splice(indexOfClickedItem, 1);
        this.selectedItems = [].concat.apply([], [this.selectedParts]);
        this.deleteandUpdatePartsDataFromStorage(
          dataItem.selectedRows[0].dataItem.id
        );
      } else {
        let storageData = JSON.parse(
          this.localStorageService.readLocalStorage(
            this.serviceRequestNumber +
              '-' +
              this.assetId +
              '-' +
              LocalStorageKeys.SelectedParts
          ) || '[]'
        );
        if (storageData.length > 0) {
          this.selectedParts = storageData;
        }
        this.selectedParts.push(dataItem.selectedRows[0].dataItem);
        this.addOrUpdatePartsSelectedDataToStorage();
        this.getSelectedDatatoBindtoGrid();
      }
      this.disableandEnableButton();
    }
    if (dataItem.deselectedRows.length) {
      const indexOfClickedItem = this.selectedParts.findIndex(function(o) {
        return o.id === dataItem.deselectedRows[0].dataItem.id;
      });
      this.selectedParts.splice(indexOfClickedItem, 1);
      this.selectedItems = [].concat.apply([], [this.selectedParts]);
      this.deleteandUpdatePartsDataFromStorage(
        dataItem.deselectedRows[0].dataItem.id
      );
      this.disableandEnableButton();
    }
  }

  //get selected object on cell click
  public onCellClickEvent({ dataItem }) {
    const indexOfClickedItem = this.selectedParts.findIndex(function(o) {
      return o.id === dataItem.id;
    });
    if (indexOfClickedItem > -1 && indexOfClickedItem != -1) {
      this.selectedParts.splice(indexOfClickedItem, 1);
      this.selectedItems = [].concat.apply([], [this.selectedParts]);
      this.deleteandUpdatePartsDataFromStorage(dataItem.id);
      this.disableandEnableButton();
    } else {
      let storageData = JSON.parse(
        this.localStorageService.readLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.SelectedParts
        ) || '[]'
      );
      if (storageData.length > 0) {
        this.selectedParts = storageData;
      }
      this.cellClicked = true;
      this.selectedParts.push(dataItem);
      this.addOrUpdatePartsSelectedDataToStorage();
      this.getSelectedDatatoBindtoGrid();
      this.disableandEnableButton();
    }
  }

  //set selected parts on grid
  public setSelectedPart(selectedParts: PartModel[]): void {
    this.selectedParts = selectedParts;
    this.selectedItems = [].concat.apply([], [this.selectedParts]);
  }

  //infinity scrolling
  public infinitySearch() {
    if (!this.endOfResults) {
      this.partSearchModel.pageNumber += 1;
      this.getParts();
    }
  }

  //reset search data on search params
  public resetPartSearchModel() {
    const { pageNumber, pageSize, machineProductId } = this.partSearchModel;
    this.partSearchModel = { pageNumber, pageSize };
    if (machineProductId) {
      this.partSearchModel.machineProductId = machineProductId;
    }
  }

  // add all the selected parts to storage
  addOrUpdatePartsSelectedDataToStorage() {
    if (this.selectedParts.length > 0) {
      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts,
        JSON.stringify(this.selectedParts)
      );
    }
  }

  //delete all the deselected parts from storage
  deleteandUpdatePartsDataFromStorage(id: any) {
    var checkExistingPartData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      ) || '[]'
    );
    const indexOfClickedItem = checkExistingPartData.findIndex(function(o: {
      id: any;
    }) {
      return o.id === id;
    });
    if (indexOfClickedItem > -1) {
      checkExistingPartData.splice(indexOfClickedItem, 1);
    }

    this.deletePartFromPcrScreen(id);

    this.localStorageService.deleteLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.SelectedParts
    );
    this.localStorageService.writeLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.SelectedParts,
      JSON.stringify(checkExistingPartData)
    );
  }

  public deletePartFromPcrScreen(id: number) {
    let localStorage = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );

    if (localStorage && localStorage.length) {
      localStorage = localStorage.filter((x: any) => x.partId !== id);

      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse,
        JSON.stringify(localStorage)
      );
    }
  }

  // filterr grid data on search value
  public onTypeSearch(value: any): void {
    if (typeof value === 'string') {
      this.searchString = value;
    }
    this.partsData.pageNumber = 1;
    this.partsData.pageNumber = this.partsData.pageNumber++;
    this.partSearchModel.pageNumber = this.partsData.pageNumber;
    this.partsData.pageSize = 100;
    this.partsData.results = [];
    this.partModel = [];
    this.existingPartsResult = [];
    this.addOrUpdateSearchParams();
    this.getParts();
  }

  //add search params for parts api
  public addOrUpdateSearchParams() {
    this.partSearchModel.searchString = this.searchString;
    this.partSearchModel.machineProductId = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.MachineProductId
    );
  }

  //bind all the selected data to the grid
  public getSelectedDatatoBindtoGrid() {
    let storageData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      ) || '[]'
    );
    var storageDataIds = storageData.map((t: any) => t.id);
    var selectedPartsModel = this.partModel.filter(partId =>
      storageDataIds.includes(partId.id)
    );

    if (this.cellClicked) {
      this.selectedItems = [].concat.apply([], [selectedPartsModel]);
      this.selectedParts = this.selectedItems;
      this.cellClicked = false;
    } else if (
      storageDataIds &&
      selectedPartsModel &&
      storageDataIds.length > 0
    ) {
      if (
        selectedPartsModel.length != storageDataIds.length &&
        !this.searchString.length
      ) {
        this.onInitialLoad = true;
        this.infinitySearch();
      } else {
        this.selectedItems = [].concat.apply([], [selectedPartsModel]);
        this.selectedParts = this.selectedItems;
        if (this.onInitialLoad) {
          this.setSelectedDataOnTop();
          this.onInitialLoad = false;
          this.isDataLoading = false;
        } else if (this.searchString.length > 2) {
          this.onInitialLoad = false;
          this.isDataLoading = false;
        }
      }
    } else {
      this.isDataLoading = false;
      this.disableandEnableButton();
    }
  }

  setSelectedDataOnTop(): void {
    if (this.selectedParts && this.selectedParts.length) {
      this.selectedParts.forEach(selectedPart => {
        const index = this.partModel.findIndex(
          part => part.id == selectedPart.id
        );
        if (index > -1) {
          this.partModel.splice(index, 1);
        }
      });
      let sp = this.selectedItems;
      this.partModel = sp.concat(this.partModel);
      this.disableandEnableButton();
    }
  }

  //enable and disable button
  public disableandEnableButton() {
    let storageData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      ) || '[]'
    );
    if (storageData.length > 0) {
      this.PartSelected.emit({ isPartSelected: true });
    }
    if (storageData.length == 0) {
      this.PartSelected.emit({ isPartSelected: false });
    }
  }
}
