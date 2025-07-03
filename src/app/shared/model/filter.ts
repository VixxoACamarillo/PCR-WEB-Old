// defines Filter datatype structure
export class Filter {
  filterLevel = '';
  label = '';
  field = '';
  operator = '';
  value: any;
  valueType?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
