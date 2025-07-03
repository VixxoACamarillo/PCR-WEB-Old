import { SiteModel } from './site.model';

export class SiteLocationMapModel {
  site?: SiteModel;

  locationData?: {
    geometry?: {
      location?: {
        lat?: number;
        lng?: number;
      };
    };
    url?: string;
    opening_hours?: {
      weekday_text?: string;
      open_now?: boolean;
    };
  };

  typeLayout: TypeLayout;

  constructor(values: Object = {}) {
    Object.assign(this, values);

    // In case typeLayout is not assigned the default will be 'global'
    if (this.typeLayout !== TypeLayout.SITE_INFO) {
      this.typeLayout = TypeLayout.GLOBAL;
    }
  }
}

export enum TypeLayout {
  GLOBAL = 'global',
  SITE_INFO = 'siteInfo'
}
