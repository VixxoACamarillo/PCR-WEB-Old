export enum ServiceRequestTypes {
  PreventiveMaintenance = 'Preventative Maintenance',
  Repair = 'Repair'
}

export enum AttachmentSubTypes {
  TechnicianSignature = 'technicianSignature',
  CustomerSignature = 'customerSignature'
}

export enum Frequency {
  Weekly = 'Weekly',
  Biweekly = 'Every 2 Weeks',
  Monthly = 'Monthly',
  Bimonthly = 'Every 2 Months',
  Semiannually = 'Every 6 Months',
  Annually = 'Yearly'
} // Should enum names be different from their values?

export enum Network {
  FSN = 'fsn',
  Customer = 'customer'
}

export enum ModalStatus {
  CHANGE = 'change',
  CANCEL = 'cancel'
}

export class ServiceRequestDetailModel {
  completionSLA: string;
  createdDate: string;
  workDate: string;
  customer: {
    name: string;
    number: string;
    id: string;
  };
  customerNotToExceed: string;
  customerPriorities: [
    {
      calendar: string;
      description: string;
      name: string;
      overtimeAllowed: boolean;
      priorityOrder: number;
      resolveHours: number;
      responseHours: number;
    }
  ];
  description: string;
  lineOfService: string;
  lineOfServiceId: string;
  notToExceed: number;
  number: string;
  overtimeAuthorization: boolean;
  priority: string;
  responseSLA: string;
  serviceCenter: {
    name: string;
    phoneNumber: string;
    primaryEmail: string;
    secondaryEmail: string;
  };
  issue: {
    id: string;
    name: string;
  };
  serviceProvider: {
    name: string;
    number: string;
  };
  shortDescription: string;
  site: {
    addressLineOne: string;
    city: string;
    country: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    number: string;
    googlePlaceId: string;
    phoneNumber: string;
    state: string;
    timezone: string;
    zipcode: string;
  };
  statusGroupType: string;
  subStatus: string;
  type: string;
  pmPlanName: string;
  pmFrequency: string;
  pmVariable: string;
  minDaysBetweenVisits: string;
  pmStaticWorkSteps: string[];
  pmSpecialInstructions: string;
  requestorName: string;
  requestorPosition: string;
  isJobComplete: boolean;
  isEditable: boolean;
  teamLeadFirstName: string;
  teamLeadLastName: string;
  supportPhoneNumber: string;
  pmExpectedCompletionMonth: string;
  pmStartDate: string;
  pmEndDate: string;
  network: Network;
  recentTime: {
    id: string;
    isActive: boolean;
    isJobComplete: boolean;
    serviceRequestNumber: string;
    technicianCount: number;
    timestamp: string;
    type: string;
    updatedDate: string;
  };

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  isRepair(): boolean {
    return this.type === ServiceRequestTypes.Repair;
  }

  isPreventiveMaintenance(): boolean {
    return this.type === ServiceRequestTypes.PreventiveMaintenance;
  } // TARA: can we model this in an object type?
}
