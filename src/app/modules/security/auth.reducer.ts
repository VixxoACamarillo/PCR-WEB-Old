import { User } from './model/user.model';

interface AuthState {
  data: any;
  error: Error;
  loading: boolean;
  isAuthenticated: boolean;
  profile: User;
}

export const initialState: AuthState = {
  data: {},
  loading: false,
  error: new Error(),
  isAuthenticated: false,
  profile: {
    sub: '',
    nickname: '',
    name: '',
    picture: '',
    updated_at: Date,
    email: '',
    email_verified: false,
    userMetadata: {
      customer: {
        customerNumbers: [],
        siteIds: []
      },
      eulaAcceptance: []
    },
    'https://vixxo.com/user_metadata': {
      serviceProviderIds: [],
      serviceProviderNumbers: [],
      site: {
        id: '',
        name: ''
      },
      customer: {
        number: '',
        name: ''
      }
    },
    'https://vixxo.com/app_metadata': {
      serviceProviderNumbers: [],
      authorization: {
        groups: [],
        roles: [],
        permissions: []
      }
    }
  }
};

export function authReducer() {}
