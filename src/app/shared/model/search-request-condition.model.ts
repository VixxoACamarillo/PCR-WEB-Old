import { Operator } from './operator.model';
import { SearchRequestFieldQueryModel } from './search-request-field-query.model';
export class SearchRequestConditionModel {
  operator: Operator;
  fields: any[];

  constructor(operator: Operator, fields: SearchRequestFieldQueryModel[]) {
    this.operator = operator;
    this.fields = fields;
  }
}
