import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateTimeService } from '../../services/datetime.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { SrPriorityUtils } from '../../utils/sr-priority.utils';
import { SelectableMode, SelectableSettings } from '@progress/kendo-angular-grid';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() tableData: any;
  @Input() type = 'primary';
  @Input() headerActive: Boolean = true;
  @Input() hideScrollBar: Boolean = false;
  @Input() gridConfig: any;
  @Input() sortable: Boolean;
  @Input() multiple: Boolean;
  @Input() fullSize: Boolean;
  @Input() showBorder: Boolean;
  @Input() dataLoading: Boolean = false;
  @Output() clicked = new EventEmitter();
  @Input() selectableSettings: SelectableSettings;
  public checkboxOnly = false;
  public mode: SelectableMode = "multiple";
  public drag = false;
  tableClass: any;
  newWindowObjectReference: any = undefined;
  dir = 'desc';
  sort: any;

  constructor(private dateTimeService: DateTimeService) {
    this.setSelectableSettings();
  }

  /**
   * On Init
   */
  ngOnInit() {
    this.tableClass = this.getTableClass();
  }

  getTableClass() {
    return this.showBorder
      ? this.fullSize
        ? 'generic-table-full-size'
        : 'generic-table'
      : this.fullSize
      ? 'generic-table-full-size-no-border'
      : 'generic-table-no-border';
  }

  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === "single") {
      this.drag = false;
    }

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: this.mode,
      drag: this.drag,
    };
  }

  /*
   * Handle the sortable event for each column
   * @param colName
   * */
  private onSortChange(colName: string) {
    const dir = this.dir === 'asc' ? 'desc' : 'asc';
    const sort: SortDescriptor[] = [
      {
        field: colName,
        dir: dir
      }
    ];
    this.dir = dir;
    this.tableData = orderBy(this.tableData, sort);
  }

  /*
   * Handle the click event by cell
   * @param $event
   * */
  cellClicked($event: any): void {
    if ($event.column.sortable && !this.fullSize) {
      this.onSortChange($event.column.field);
    }
    this.clicked.emit($event);
  }

  /*
   * Handle the click event of the sortable columns
   * @param column
   * */
  sortClicked(column: any) {
    this.onSortChange(column.property);
  }

  /*
   * Handle the click on a Link type column and sends it to the SR
   * @param columnProperties
   * @param columnInfo
   */
  private goToSr(columnProperties: any, columnInfo: any): void {
    if (columnProperties.type === 'link') {
      if (
        this.newWindowObjectReference === undefined ||
        this.newWindowObjectReference.closed
      ) {
        this.newWindowObjectReference = window.open(
          `/job/${columnInfo.number}`,
          '_blank'
        );
      } else {
        this.newWindowObjectReference.focus();
      }
    }
  }

  private getPriorityColorClass(dataItem: any): string {
    return SrPriorityUtils.getPriorityColorClass(dataItem);
  }

  /*
   * Method used for event sort when table has headers
   * @param sort
   */
  sortChange(sort: any): void {
    this.sort = sort;
    this.onSortChange(sort[0].field);
  }
}
