export const LABOR_CHARGE_CONFIG = {
  desc: [
    {
      label: 'labor type',
      type: 'main',
      subtype: 'selectable',
      isTotal: false,
      accessor: 'description'
    },
    {
      label: 'quantity',
      type: 'editable',
      isTotal: false,
      accessor: 'quantity'
    }
  ],
  total: [
    { label: 'rate', type: 'text', isTotal: true, accessor: 'cost' },
    { label: 'total', type: 'text', isTotal: true, accessor: 'total' }
  ]
};

export const TRIP_CHARGE_CONFIG = {
  desc: [
    {
      label: 'description',
      type: 'main',
      subtype: 'selectable',
      isTotal: false,
      accessor: 'description'
    },
    {
      label: 'quantity',
      type: 'editable',
      isTotal: false,
      accessor: 'quantity'
    }
  ],
  total: [
    { label: 'rate', type: 'text', isTotal: true, accessor: 'cost' },
    { label: 'total', type: 'text', isTotal: true, accessor: 'total' }
  ]
};

export interface ExpensePart {
  type?: string;
  partNumber?: string;
  id?: number;
  name?: string;
  description?: string;
  startDate?: string;
  cost?: number;
  rate?: number;
  quantity?: string;
  dropDownData: Array<any>;
  selectedValue: any;
  isDisputed?: boolean;
  ormbCalculatedUnitPrice?: number;
  ormbPriceOverrideNote?: string;
  isAdditional?: boolean;
  isApiCall?: boolean;
  isConfigured?: boolean;
}

export interface ExpenseItem {
  columnConfig?: any;
  dropDownData: Array<any>;
  selectedTypes: Array<any>;
  addRowHide?: boolean;
  parts: ExpensePart[];
}
