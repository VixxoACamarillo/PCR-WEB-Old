export class User {
  sub = '';
  nickname = '';
  name = '';
  picture = '';
  updated_at = Date;
  email = '';
  email_verified = false;
  userMetadata: Object = {
    customer: {
      customerNumbers: [],
      siteIds: []
    },
    eulaAcceptance: []
  };
  'https://vixxo.com/user_metadata': Object = {
    serviceProviderIds: [],
    serviceProviderNumbers: [],
    site: {
      id: '',
      name: ''
    },
    customer: {
      number: '',
      name: ''
    },
    accepted_user_agreement: false
  };
  'https://vixxo.com/app_metadata': Object = {
    authorization: {
      groups: [],
      roles: [],
      permissions: []
    }
  };

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
