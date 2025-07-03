export type ServiceRequest = {
    type: string;
    number: string;
    priority: string;
    responseSLA: string;
    localResponseSLA: string;
    localResponseSLAString: string;
    completionSLA: string;
    localCompletionSLA: string;
    localCompletionSLAString: string;
    subStatus: string;
    invoiceStatus: string;
    status: string;
    customerName: string;
    customerNumber: string;
    contractualAdjustment: string;
    contractualAdjustmentFee: number;
    adminFee: string;
    serviceProviderAdminFee: number;
    customerSiteNumber: string;
    srCompletionDate: string;
    createInvoiceBy: string;
    invoiceDaysOld: number;
    invoiceNumber: number;
    invoiceAmount: number;
    serviceProviderInvoiceNumber: string;
    serviceProviderPaymentDueDate: string;
    paymentDate: string;
    paidOnDate: string;
    serviceProviderTotalAmount: number;
    customerInvoiceTotalAmount: number;
    paymentCheckNumber: number;
    serviceProviderInvoiceTotalAmount: number;
    serviceProviderInvoiceTotalAmountTableData: string;
    customerInvoiceTotalAmountTableData: string;
    serviceProviderNetAmount: number;
    netAmount: string;
    customer: {
      name: string;
      number: string;
    };
    issue?: {
      name: string;
      keywords: any[];
    };
    issueName: string;
    eta?: string;
    estimatedTimeOfArrival?: string;
    timeIn?: string;
    workDate?: string;
    jobComplete?: boolean;
    expectedCompletionDate?: string;
    displayEtaValue?: string;
    shortDescription: string;
    requestorName?: string;
    createdDate: string;
    localCreatedDate: string;
    localCreatedDateString: string;
    combinedCustomer: string;
    siteName: string;
    siteNumber: string;
    site: {
      id: string;
      storeNumber: number;
      streetAddress: string;
      city: string;
      state: string;
      postalCode: string;
      zipcode: number;
      country: string;
      latitude: number;
      longitude: number;
      googlePlaceId: string;
      name: string;
      number: string;
      timeZoneAbbreviation: string;
    };
    siteDescription: string;
    lineOfService: string;
    serviceRequestNumber: string;
    network: string;
    serviceProvider: {
      id: string;
      name: string;
      number: string;
    };
    expectedCompleteDate?: string;
  };
  
  export interface QuoteServiceRequest extends ServiceRequest {
    quoteId: string;
    serviceProviderNotToExceed: number;
    serviceProviderTotalAmount: number;
    serviceProviderTotalAmountTableData: number;
    serviceProviderNotToExceedTableData: string;
    customerTotalAmount: number;
    quoteStatus: string;
    id: string;
  }
  
  export interface InvoiceServiceRequest extends ServiceRequest {
    invoiceId: string;
    invoiceList: InvoiceList[];
    paidDetails?: PaidInformation;
    period: PaymentPeriod;
    glCode: string;
    serviceProviderName: string;
    customerSiteName: string;
    siteDescription: string;
  }
  
  type InvoiceList = {
    status: string;
    billingReferenceNumber: number;
    adjustmentInvoice: boolean;
    viid: number;
    createInvoiceBy: string;
    daysOld: number;
    serviceProviderTotalAmount: number;
    customerTotalAmount: number;
    consolidatedStatus: string;
    serviceProviderInvoiceNumber: string;
    serviceProviderPaymentDueDate: string;
    paymentDate: string;
    paymentCheckNumber: number;
    glCode: string;
    serviceProviderName: string;
    customerSiteName: string;
  };
  
  export type Payment = {
    status: string;
    amount: string;
    serviceProviderNumber: string;
    period: PaymentPeriod;
    dueDate: string;
    paidDetails?: PaidInformation;
  };
  
  type PaymentPeriod = {
    start: Date;
    end: Date;
  };
  
  type PaidInformation = {
    paidOn: string;
    id: number;
    deliveryType: string;
  };
  
  type FilterSet = {
    id: string;
    name: string;
    userId: number;
    filters: Filter[];
  };
  
  type Filter = {
    id: string;
    filterLevel: string;
    label: string;
    field: string;
    operator: string;
    value: any;
  };
  
  type User = {
    sub: '';
    nickname: '';
    name: '';
    picture: '';
    updated_at: Date;
    email: '';
    email_verified: false;
    userMetadata: any;
    'https://vixxo.com/user_metadata': {
      serviceProviderIds: [any];
      serviceProviderNumbers: [any];
      site: {
        id: string;
        name: string;
      };
      customer: {
        number: string;
        name: string;
      };
    };
  };
  
  type JobListGridColumn = {
    index: number;
    name: string;
    checked: boolean;
    property: string;
    type: boolean;
    locked: boolean;
  };
  
  type AppState = {
    user: {
      data: User | undefined;
      loading: false;
      error: Error | undefined;
    };
    jobs: {
      serviceRequests: {
        data: ServiceRequest[] | undefined;
        metaData: any;
        error: Error | undefined;
        loading: boolean;
        initialized: boolean;
      };
      ServiceRequestDetail: {
        data: any | undefined;
        loading: boolean;
        error: Error | undefined;
      };
      serviceRequestFilters: {
        data: Filter[] | undefined;
        error: Error | undefined;
        loading: boolean;
        initialized: boolean;
      };
      serviceRequestRecentSearch: {
        data: Filter[] | undefined;
        error: Error | undefined;
        loading: boolean;
        initialized: boolean;
      };
      serviceRequestMetadata: {
        data: any;
        error: Error | undefined;
        loading: boolean;
      };
      serviceRequestSubStatus: {
        data: any;
        error: Error | undefined;
        loading: boolean;
      };
      serviceRequestSelectedColumns: {
        data: JobListGridColumn[] | undefined;
        error: Error | undefined;
        loading: boolean;
        initialized: boolean;
      };
      invoiceSelectedColumns: {
        data: JobListGridColumn[] | undefined;
        error: Error | undefined;
        loading: boolean;
        initialized: boolean;
      };
    };
  };
  
  type State = { app: AppState };
  
  const initialState: State = {
    app: {
      user: {
        data: undefined,
        error: undefined,
        loading: false
      },
      jobs: {
        serviceRequests: {
          data: undefined,
          metaData: undefined,
          error: undefined,
          loading: false,
          initialized: false
        },
        ServiceRequestDetail: {
          data: undefined,
          loading: false,
          error: undefined
        },
        serviceRequestFilters: {
          data: undefined,
          error: undefined,
          loading: false,
          initialized: false
        },
        serviceRequestRecentSearch: {
          data: undefined,
          error: undefined,
          loading: false,
          initialized: false
        },
        serviceRequestMetadata: {
          data: undefined,
          error: undefined,
          loading: false
        },
        serviceRequestSubStatus: {
          data: undefined,
          error: undefined,
          loading: false
        },
        serviceRequestSelectedColumns: {
          data: undefined,
          error: undefined,
          loading: false,
          initialized: false
        },
        invoiceSelectedColumns: {
          data: undefined,
          error: undefined,
          loading: false,
          initialized: false
        }
      }
    }
  };
  