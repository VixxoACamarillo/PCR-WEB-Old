import { MatchType } from './match-type.model';
import { ComparisonOperator } from './comparison-operator.model';

export class SearchRequestFieldQueryModel {
  name: string;
  matchType: MatchType;
  query: any;
  comparisonOperator: ComparisonOperator;

  constructor(
    name: string,
    matchType: MatchType,
    query: any,
    comparisonOperator: ComparisonOperator
  ) {
    this.name = name;
    this.matchType = matchType;
    this.query = query;
    this.comparisonOperator = comparisonOperator;
  }
}
