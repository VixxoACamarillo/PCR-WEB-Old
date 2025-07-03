import { Operator } from './operator.model';
import { SearchRequestConditionModel } from './search-request-condition.model';
import { SortingItem } from './sorting-item.model';

export class SearchRequestModel {
  operator: Operator;
  searchConditions: SearchRequestConditionModel[];
  searchString: string;
  searchStringOperator: Operator;
  pageNumber: number;
  pageSize: number;
  sorting: SortingItem[];
  exportOption: exportOptionType;

  constructor() {
    this.pageSize = 10;
    this.pageNumber = 1;
  }
}

export enum exportOptionType {
  None = 'None',
  JobExport = 'JobExport',
  PmExport = 'PmExport'
}
