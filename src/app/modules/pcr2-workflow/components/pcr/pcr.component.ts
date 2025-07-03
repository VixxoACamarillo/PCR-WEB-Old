import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { PartLocationService } from '../../../../service/part-location.service';
import {
  PartLocation,
  PartLocationLevelDataModel,
  PartInformation,
  PartLocationInterface,
  Action,
  Cause
} from '../../../../model/parts-location-model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ActionsService } from '../../../../service/actions.service';
import { LocalStorageKeys } from '../../../../shared/model/constants/local-storage-keys';
import { ActivatedRoute } from '@angular/router';
import { CauseService } from '../../../../service/cause.service';

@Component({
  selector: 'app-pcr',
  templateUrl: './pcr.component.html',
  styleUrls: ['./pcr.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PcrComponent implements OnInit {
  public selectedCause: Cause = new Cause();
  public selectedAction: Action = new Action();
  public locationResponse: PartLocation[];
  public partsCount: number;
  public partsLevelData: PartLocationLevelDataModel = {
    partId: 0,
    copyId: 0,
    levelOne: [],
    levelTwo: [],
    levelThree: [],
    levelFour: [],
    levelFive: [],
    levelSix: []
  };

  public selection: PartLocationInterface[] = [];
  public selectedInformation: any = [];
  public selectedParts: any = [];
  public actionsData: any = [];
  public selectedActions: [];
  public loader: boolean = false;
  public lastLevelSelection: any;
  public partsInfoHeader: any[] = [];
  public requestError: any = null;
  private serviceRequestNumber: string;
  private assetId: string;
  public showDeleteConfirmation: boolean = false;
  public deletePartInfo: any;
  public isEdit: boolean = false;
  public existingData: any;
  public apiLoader: boolean;
  public locationLoader: boolean = false;

  @Output() disableNextButton = new EventEmitter<{
    isPathActionCauseSelected: boolean;
  }>();
  constructor(
    private localStorageService: LocalStorageService,
    private partLocationService: PartLocationService,
    private actionsService: ActionsService,
    private route: ActivatedRoute,
    private causeService: CauseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.apiLoader = true;
    this.serviceRequestNumber = this.route.snapshot.params['serviceRequestNumber'];
    this.assetId = this.route.snapshot.params['assetId'];
    this.existingData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      )
    );

    let localStorageData = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      )
    );

    if (this.existingData && this.existingData.length) {
      this.isEdit = true;
      this.existingData.forEach((part: PartLocation) => {
        if (part.pcrLocationPaths && part.pcrLocationPaths.length > 0) {
          const locationIndex = part.pcrLocationPaths.findIndex(
            (x: PartInformation) => x.isSelected == true
          );
          part.isEdit = locationIndex > -1;
        } else if (part.action || part.cause || part.partLocationId) {
          part.isEdit = true;
        }
      });
    }

    if (
      localStorageData &&
      (this.existingData && this.existingData.length > 0)
    ) {
      this.existingData.forEach((part: any) => {
        const index = localStorageData.findIndex(
          (x: any) => x.id == part.partId
        );
        if (index > -1) {
          localStorageData.splice(index, 1);
        }
      });
    }
    if (localStorageData && localStorageData.length > 0 && this.isEdit) {
      this.getLocationSetup(localStorageData);
    } else {
      this.fetchExistingData();
    }

    if (!this.isEdit) {
      this.getLocationSetup(localStorageData);
      this.getActionsByPartIds();
    }
  }

  displayLoader() {
    let parts = JSON.parse(
      this.localStorageService.readLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.SelectedParts
      )
    );

    if (parts && parts.length == 0) {
      return false;
    } else if (this.locationResponse && this.locationResponse.length == 0) {
      return true;
    } else if (this.loader || this.apiLoader || this.locationLoader) {
      return true;
    }
    return false;
  }

  getLocationSetup(localStorageData: any) {
    this.locationLoader = true;
    if (localStorageData) {
      localStorageData.forEach((selectedPart: any) => {
        this.selectedParts.push(selectedPart.id);
        this.partsInfoHeader.push(selectedPart);
      });

      this.partLocationService
        .getLocation(this.selectedParts)
        .subscribe(location => {
          if (location) {
            if (this.locationResponse) {
              location.forEach((part: any) => this.locationResponse.push(part));
            } else {
              this.locationResponse = location;
            }
            this.locationResponse.forEach((resp) => {
              const index = localStorageData.findIndex(
                (x: any) => x.id === resp.partId
              );
              resp.copyId = 0;
              resp.skuNumber =
                index > -1 ? localStorageData[index].sku.toString() : '';
              if (resp.pcrLocationPaths) {
                resp.pcrLocationCopyCount = resp.pcrLocationPaths.filter(
                  (a) => a.partLocationId != null && a.partLocationId != 0
                ).length;
              }

              resp.showCopyIcon =
                resp.pcrLocationCopyCount >
                this.locationResponse.filter(f => f.partId == resp.partId)
                  .length;
            });
            this.partsCount = this.locationResponse
              ? this.locationResponse.length
              : 0;
            if (this.partsCount) {
              this.locationResponse.forEach(element => {
                this.partsLevelData.levelOne = element.pcrLocationPaths
                  ? element.pcrLocationPaths.filter(
                      (location: PartInformation) => location.level === 1
                    )
                  : [];
                let partLevelInfoObject = {
                  partId: element.partId,
                  copyId: 0,
                  levelInfo: this.partsLevelData.levelOne
                };
                const index = this.selection.findIndex(
                  part =>
                    part.partId == element.partId &&
                    part.copyId == element.copyId
                );
                if (index == -1) {
                  this.selection.push(partLevelInfoObject);
                }
              });
            }
          }
          if (
            (this.locationResponse &&
              this.locationResponse.length < this.partsInfoHeader.length) ||
            !this.locationResponse
          ) {
            this.partsInfoHeader.forEach(part => {
              const index = this.locationResponse
                ? this.locationResponse.findIndex(
                    resp => resp.partId == part.id
                  )
                : -1;
              if (index == -1) {
                let partObject = {
                  partId: part.id,
                  copyId: 0,
                  pcrLocationCopyCount: part.pcrLocationCopyCount,
                  showCopyIcon: part.showCopyIcon,
                  partName: part.name,
                  partNumber: part.number,
                  skuNumber: part.sku.toString(),
                  action: new Action(),
                  cause: new Cause()
                };
                this.locationResponse.push(partObject);
              }
            });
          }
          if (this.isEdit) {
            this.fetchExistingData();
          }
          this.locationResponse.forEach(part => {
            if (part.pcrLocationPaths && part.pcrLocationPaths.length == 1) {
              part.partLocationId = part.pcrLocationPaths[0].partLocationId;
              part.pcrLocationPaths.splice(0);
              let index = this.selection.findIndex(
                selectedPart =>
                  selectedPart.copyId == part.copyId &&
                  selectedPart.partId == part.partId
              );
              if (index > -1) {
                this.selection.splice(index, 1);
              }
            }
          });
          this.apiLoader = this.locationLoader = false;
        });
    }
  }
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  fetchExistingData() {
    if (this.existingData && this.existingData.length) {
      if (this.locationResponse) {
        this.existingData.forEach((part: any) =>
          this.locationResponse.push(part)
        );
      } else {
        this.locationResponse = this.existingData;
      }

      this.locationResponse.forEach(resp => {
        this.selectedParts.push(resp.partId);
        this.partsInfoHeader.push(resp);
        if (resp && resp.pcrLocationPaths) {
          resp.pcrLocationCopyCount = resp.pcrLocationPaths.filter(
            a => a.partLocationId != null && a.partLocationId != 0
          ).length;
          resp.showCopyIcon =
            resp.pcrLocationCopyCount >
            this.locationResponse.filter(f => f.partId == resp.partId).length;
        }
        if (!this.loader) {
          this.loader = true;
        }
        this.causeService
          .getCauseByPartId(resp.partId)
          .subscribe((response: any) => {
            resp.causeData = response;
            this.loader = false;
          });
      });
      this.partsCount = this.locationResponse
        ? this.locationResponse.length
        : 0;
      if (this.partsCount) {
        this.locationResponse.forEach(element => {
          this.partsLevelData.levelOne =
            element && element.pcrLocationPaths
              ? element.pcrLocationPaths.filter(
                  (location: PartInformation) => location.level === 1
                )
              : [];
          let partLevelInfoObject = {
            partId: element.partId,
            copyId: element.copyId,
            levelInfo: this.partsLevelData.levelOne
          };
          const index = this.selection.findIndex(
            part =>
              part.partId == element.partId && part.copyId == element.copyId
          );
          if (index == -1) {
            this.selection.push(partLevelInfoObject);
          }
        });
      }
    }
    if (
      (this.locationResponse &&
        this.locationResponse.length < this.partsInfoHeader.length) ||
      !this.locationResponse
    ) {
      this.partsInfoHeader.forEach(part => {
        if (part.isEdit) {
          const index = this.locationResponse
            ? this.locationResponse.findIndex(
                resp => resp.partId == part.partId
              )
            : -1;
          if (index == -1) {
            let partObject = {
              partId: part.id,
              copyId: part.coptyId ? part.copyId : 0,
              pcrLocationCopyCount: part.pcrLocationCopyCount,
              showCopyIcon: part.showCopyIcon,
              partName: part.name,
              partNumber: part.number,
              skuNumber: part.skuNumber.toString(),
              action: part.action,
              cause: part.cause
            };
            this.locationResponse.push(partObject);
          }
        }
      });
    }
    this.getActionsByPartIds();
  }

  seletedPartActionCause(
    event: any,
    selectedCausePartId: number,
    selectedCauseCopyId: number = 0
  ) {
    let currentLocalApiResponce = this.locationResponse.filter(
      a => a.partId == selectedCausePartId && a.copyId == selectedCauseCopyId
    );

    if (event.selectedAction && event.selectedAction.actionId) {
      currentLocalApiResponce[0].action = event.selectedAction;
    }

    if (
      event.selectedAction &&
      event.selectedAction.actionId &&
      event.selectedCause &&
      event.selectedCause.causeId === undefined
    ) {
      currentLocalApiResponce[0].cause = new Cause();
    }

    if (
      event.selectedAction &&
      event.selectedAction.actionId == undefined &&
      event.selectedCause &&
      event.selectedCause.causeId === undefined
    ) {
      currentLocalApiResponce[0].cause = new Cause();
      currentLocalApiResponce[0].action = new Action();
      currentLocalApiResponce[0].overviewPartQuantity = null;
    }

    if (event.selectedCause && event.selectedCause.causeId) {
      currentLocalApiResponce[0].cause = event.selectedCause;
    }

    if (
      event.selectedAction &&
      event.selectedAction.actionName &&
      event.selectedAction.actionName.toLowerCase() == 'replaced'
    ) {
      currentLocalApiResponce[0].overviewPartQuantity = 1;
    }

    let readLocalStorageapiResponse = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ApiResponse
    );
    if (
      readLocalStorageapiResponse == null ||
      readLocalStorageapiResponse == ''
    ) {
      this.localStorageService.deleteLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse
      );
      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse,
        JSON.stringify(currentLocalApiResponce)
      );
    } else {
      let findLocalStorageIndex = JSON.parse(
        readLocalStorageapiResponse
      ).findIndex(
        (r: any) =>
          r.partId == selectedCausePartId && r.copyId == selectedCauseCopyId
      );
      let parseLocalStorageapiResponseData = JSON.parse(
        readLocalStorageapiResponse
      );
      parseLocalStorageapiResponseData.splice(
        findLocalStorageIndex == -1
          ? JSON.parse(readLocalStorageapiResponse).length
          : findLocalStorageIndex,
        1,
        currentLocalApiResponce[0]
      );

      this.localStorageService.writeLocalStorage(
        this.serviceRequestNumber +
          '-' +
          this.assetId +
          '-' +
          LocalStorageKeys.ApiResponse,
        JSON.stringify(parseLocalStorageapiResponseData)
      );
    }
  }

  editPathSelection(pathToEdit: PartInformation, copyId: number) {
    if (this.isEdit) {
      this.locationResponse.forEach(part => {
        if (part.partId == pathToEdit.partid && part.copyId == copyId) {
          part.isEdit = false;
        }
      });
    }

    //turn flag in locationresponse as false.
    let level = pathToEdit.level;
    this.lastLevelSelection = null;
    this.locationResponse.forEach((path) => {
      if (path.partId === pathToEdit.partid && path.copyId == copyId) {
        let pathFormedIndex = path.pathFormed.findIndex(
          (x: any) => x == pathToEdit.partUiPathId
        );
        if (pathFormedIndex > -1) {
          path.pathFormed.splice(pathFormedIndex);
        }
        const index = path.pcrLocationPaths.findIndex(
          (x:any) => x.isSelected && x.partUiPathId == pathToEdit.partUiPathId
        );
        if (index > -1) {
          //turned the flag of selected part to false
          path.pcrLocationPaths[index].isSelected = false;
        }
        path.pcrLocationPaths.forEach((x) => {
          if (x.level > level) {
            x.isSelected = false;
          }
          if (
            x.isSelected &&
            x.partUiPathId == pathToEdit.parentId &&
            x.partUiPath === pathToEdit.partUiPath
          ) {
            this.lastLevelSelection = x;
          }
        });
      }
    });
    if (this.lastLevelSelection) {
      this.locationResponse.forEach((path) => {
        if (path.partId == pathToEdit.partid && path.copyId == copyId) {
          let pathFormedIndex = path.pathFormed.findIndex(
            (x: any) => x == this.lastLevelSelection.partUiPathId
          );
          if (pathFormedIndex > -1) {
            path.pathFormed.splice(pathFormedIndex);
          }
        }
      });
      this.nextLevelSelectionData(this.lastLevelSelection, copyId);
    } else {
      this.locationResponse.forEach((element) => {
        if (element.partId == pathToEdit.partid && element.copyId == copyId) {
          this.partsLevelData.levelOne = element.pcrLocationPaths.filter(
            (location: PartInformation) => location.level === 1
          );
          this.partsLevelData.partId = element.partId;
          let index = this.selection.findIndex(
            el => el.partId == element.partId && el.copyId == copyId
          );
          let partLevelInfoObject = {
            partId: element.partId,
            copyId: element.copyId,
            levelInfo: this.partsLevelData.levelOne
          };
          if (index > -1) {
            this.selection[index] = partLevelInfoObject;
          }
        }
      });
    }
    this.updatePartSelection(pathToEdit, copyId);
    this.updateLocalStorage(pathToEdit, copyId);
    this.updatePartLocationLocalApiResponse(pathToEdit, copyId);
  }

  ngDoCheck() {
    const flag =
      !this.locationResponse ||
      this.locationResponse.length == 0 ||
      this.locationResponse.filter(
        (item: PartLocation) =>
          !item.cause || !item.cause.causeId || isNaN(item.cause.causeId)
      ).length > 0;
    this.disableNextButton.emit({ isPathActionCauseSelected: !flag });
  }

  nextLevelSelectionData(selectedPart: any, copyId: number) {
    let levelNumber = selectedPart.level + 1;

    this.locationResponse.forEach(x => {
      if (x.partId == selectedPart.partid && x.copyId == copyId) {
        if (x.pathFormed) {
          x.pathFormed.push(selectedPart.partUiPathId);
        } else {
          x.pathFormed = [];
          x.pathFormed.push(selectedPart.partUiPathId);
        }
      }
    });

    //fetching next level data
    this.locationResponse.forEach((element) => {
      if (
        element.partId === selectedPart.partid &&
        element.copyId == copyId &&
        element.pcrLocationPaths
      ) {
        this.onCloseError();
        let findLocation = element.pcrLocationPaths.filter(
          (part: PartInformation) =>
            part.level === levelNumber &&
            part.parentId === selectedPart.partUiPathId &&
            part.partUiPath === selectedPart.partUiPath
        );

        this.partsLevelData[this.levelString(levelNumber)] = findLocation;

        let selectionIndex = this.selection.findIndex(
          el => el.partId == element.partId && el.copyId == copyId
        );
        let partLevelInfoObject = {
          partId: element.partId,
          copyId: element.copyId,
          levelInfo: this.partsLevelData[this.levelString(levelNumber)]
        };

        this.selection.splice(selectionIndex, 1, partLevelInfoObject);
        if (selectedPart.isAreaPathLevelPartialSelect) {
          this.updatePartSelection(selectedPart, copyId);
        }
        if (findLocation.length == 0) {
          let formedPath =
            element.pathFormed.toString() &&
            element.pathFormed.toString().length > 1
              ? element.pathFormed.toString().replace(/,/gi, '\\')
              : element.pathFormed.toString();

          let currentLocalApiResponce = this.locationResponse.filter(
            a => a.partId == element.partId && a.copyId == copyId
          );
          let readLocalStorageapiResponse = this.localStorageService.readLocalStorage(
            this.serviceRequestNumber +
              '-' +
              this.assetId +
              '-' +
              LocalStorageKeys.ApiResponse
          );
          if (
            readLocalStorageapiResponse == null ||
            readLocalStorageapiResponse == ''
          ) {
            this.localStorageService.deleteLocalStorage(
              this.serviceRequestNumber +
                '-' +
                this.assetId +
                '-' +
                LocalStorageKeys.ApiResponse
            );
            this.localStorageService.writeLocalStorage(
              this.serviceRequestNumber +
                '-' +
                this.assetId +
                '-' +
                LocalStorageKeys.ApiResponse,
              JSON.stringify(currentLocalApiResponce)
            );
          } else {
            let findLocalStorageIndex = JSON.parse(
              readLocalStorageapiResponse
            ).findIndex(
              (r: any) => r.partId == element.partId && r.copyId == copyId
            );
            let parseLocalStorageapiResponseData = JSON.parse(
              readLocalStorageapiResponse
            );
            parseLocalStorageapiResponseData.splice(
              findLocalStorageIndex == -1
                ? JSON.parse(readLocalStorageapiResponse).length
                : findLocalStorageIndex,
              1,
              currentLocalApiResponce[0]
            );

            this.localStorageService.writeLocalStorage(
              this.serviceRequestNumber +
                '-' +
                this.assetId +
                '-' +
                LocalStorageKeys.ApiResponse,
              JSON.stringify(parseLocalStorageapiResponseData)
            );
          }
        }
      }
    });
  }

  getActionsByPartIds() {
    if (this.selectedParts && this.selectedParts.length) {
      this.actionsService
        .getActionsByPartIds(this.selectedParts)
        .subscribe((response: any) => {
          this.actionsData = response;
          this.apiLoader = false;
        });
    }
  }

  getActionsByPartId(partId: string) {
    var selectedData = this.actionsData.filter(
      (action: any) => partId == action.partId
    );
    if (selectedData && selectedData.length > 0 && partId) {
      this.selectedActions = selectedData[0].pcrActions;
    }
    return this.selectedActions;
  }

  levelString(levelNumber: number): string {
    if (levelNumber == 1) {
      return 'levelOne';
    } else if (levelNumber == 2) {
      return 'levelTwo';
    } else if (levelNumber == 3) {
      return 'levelThree';
    } else if (levelNumber == 4) {
      return 'levelFour';
    } else if (levelNumber == 5) {
      return 'levelFive';
    } else if (levelNumber == 6) {
      return 'levelSix';
    }
    return ''
  }

  copyPart(partId: number) {
    let findLastIndexPart = this.locationResponse
      .map(el => el.partId)
      .lastIndexOf(partId);

    let addedNextCopyResponse = JSON.parse(
      JSON.stringify(this.locationResponse[findLastIndexPart])
    );
    addedNextCopyResponse.pcrLocationPaths.filter(
      (a: any) => (a.isSelected = false)
    );
    addedNextCopyResponse.pathFormed = [];
    addedNextCopyResponse.copyId = addedNextCopyResponse.copyId + 1;
    addedNextCopyResponse.isEdit = false;
    addedNextCopyResponse.action = new Action();
    addedNextCopyResponse.cause = new Cause();
    addedNextCopyResponse.overviewPartQuantity = null;
    addedNextCopyResponse.isReportedFix = addedNextCopyResponse.isProactiveFix = false;

    this.locationResponse.splice(
      findLastIndexPart + 1,
      0,
      addedNextCopyResponse
    );

    this.partsLevelData.levelOne = addedNextCopyResponse.pcrLocationPaths.filter(
      (location: PartInformation) => location.level === 1
    );
    let partLevelInfoObject = {
      partId: addedNextCopyResponse.partId,
      copyId: addedNextCopyResponse.copyId,
      levelInfo: this.partsLevelData.levelOne
    };

    const index = this.selection.findIndex(
      part =>
        part.partId == addedNextCopyResponse.partId &&
        part.copyId == addedNextCopyResponse.copyId
    );
    if (index == -1) {
      this.selection.push(partLevelInfoObject);
    }

    this.locationResponse.forEach((change) => {
      if (change.partId == partId) {
        change.showCopyIcon =
          change.pcrLocationCopyCount >
          this.locationResponse.filter(l => l.partId == partId).length;
      }
    });
  }

  deletePart(part: any) {
    this.showDeleteConfirmation = true;
    this.deletePartInfo = part;
  }

  close(partId: number, copyId: number, event: any) {
    if (event.status.toLowerCase() == 'change') {
      const selectionIndex = this.selection.findIndex(
        x => x.copyId == copyId && x.partId == partId
      );
      this.selection.splice(selectionIndex, 1);
      let index = this.locationResponse.findIndex(
        part => part.copyId == copyId && part.partId == partId
      );
      let count = this.locationResponse.reduce(function(n: any, part) {
        return n + (part.partId == partId);
      }, 0);

      let currentLocaStorage = JSON.parse(
        this.localStorageService.readLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.ApiResponse
        )
      );
      if (currentLocaStorage) {
        let currentIndex = currentLocaStorage.findIndex(
          (part: any) => part.partId == partId && part.copyId == copyId
        );
        if (currentIndex > -1) {
          currentLocaStorage.splice(currentIndex, 1);
          this.localStorageService.writeLocalStorage(
            this.serviceRequestNumber +
              '-' +
              this.assetId +
              '-' +
              LocalStorageKeys.ApiResponse,
            JSON.stringify(currentLocaStorage)
          );
        }
      }

      if (index > -1) {
        this.locationResponse.splice(index, 1);
        let localStorageData = JSON.parse(
          this.localStorageService.readLocalStorage(
            this.serviceRequestNumber +
              '-' +
              this.assetId +
              '-' +
              LocalStorageKeys.SelectedParts
          )
        );
        if (count == 1) {
          index = localStorageData.findIndex((part: any) => part.id == partId);
          localStorageData.splice(index, 1);
          this.localStorageService.writeLocalStorage(
            this.serviceRequestNumber +
              '-' +
              this.assetId +
              '-' +
              LocalStorageKeys.SelectedParts,
            JSON.stringify(localStorageData)
          );
        }
      }
      this.locationResponse.forEach((change) => {
        if (change.partId == partId) {
          change.showCopyIcon =
            change.pcrLocationCopyCount >
            this.locationResponse.filter(l => l.partId == partId).length;
        }
      });
    }
    this.showDeleteConfirmation = false;
  }

  /**
   * Clear the Error
   */
  protected onCloseError() {
    return (this.requestError = null);
  }

  getSelectionByPartId(partId: number, copyId: number) {
    let levelInfo = this.selection.filter(
      f => f.partId == partId && f.copyId == copyId
    );
    return levelInfo.length > 0 ? levelInfo[0].levelInfo : null;
  }

  updateLocalStorage(pathToEdit: PartInformation, copyId: number) {
    let readLocalStorageapiResponse = this.localStorageService.readLocalStorage(
      this.serviceRequestNumber +
        '-' +
        this.assetId +
        '-' +
        LocalStorageKeys.ApiResponse
    );
    let parseReadLocalStorageapiResponse = readLocalStorageapiResponse
      ? JSON.parse(readLocalStorageapiResponse)
      : [];
    if (
      parseReadLocalStorageapiResponse &&
      parseReadLocalStorageapiResponse.length > 0
    ) {
      let findLocalStorageIndex = parseReadLocalStorageapiResponse.findIndex(
        (r: PartLocation) =>
          r.partId === pathToEdit.partid && r.copyId === copyId
      );

      let currentLocalApiResponce = parseReadLocalStorageapiResponse.find(
        (f: PartLocation) =>
          f.partId === pathToEdit.partid && f.copyId === copyId
      );
      if (currentLocalApiResponce) {
        currentLocalApiResponce.action = new Action();
        currentLocalApiResponce.cause = new Cause();
        currentLocalApiResponce.overviewPartQuantity = null;

        if (pathToEdit.level === 1) {
          let apiResponse = this.locationResponse.find(
            (lf: any) => lf.partId == pathToEdit.partid && lf.copyId === copyId
          );

          currentLocalApiResponce.pathFormed = apiResponse.pathFormed;
          currentLocalApiResponce.pcrLocationPaths =
            apiResponse.pcrLocationPaths;
          currentLocalApiResponce.isEdit = apiResponse.isEdit;
          currentLocalApiResponce.showCopyIcon = apiResponse.showCopyIcon;
          currentLocalApiResponce.pcrLocationCopyCount =
            apiResponse.pcrLocationCopyCount;
        }
        parseReadLocalStorageapiResponse.splice(
          findLocalStorageIndex,
          1,
          currentLocalApiResponce
        );

        this.localStorageService.writeLocalStorage(
          this.serviceRequestNumber +
            '-' +
            this.assetId +
            '-' +
            LocalStorageKeys.ApiResponse,
          JSON.stringify(parseReadLocalStorageapiResponse)
        );
      }
    }
  }

  updatePartLocationLocalApiResponse(
    pathToEdit: PartInformation,
    copyId: number
  ) {
    this.locationResponse.forEach((part) => {
      if (part.partId == pathToEdit.partid && part.copyId == copyId) {
        part.action = new Action();
        part.cause = new Cause();
        part.overviewPartQuantity = null;
      }
    });
  }

  updatePartSelection(partLevelInformation: PartInformation, copyId: number) {
    if (this.selection && partLevelInformation.level > 1) {
      this.selection.forEach(level => {
        if (
          level.partId == partLevelInformation.partid &&
          level.copyId == copyId &&
          level &&
          level.levelInfo.length > 0
        ) {
          level.levelInfo[0].isAreaPathLevelPartialSelect = true;
        }
      });
    }
  }
}
