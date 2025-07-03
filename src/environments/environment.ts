import { git } from './git';
const origin = 'http://localhost:4200';
const apiOrigin = 'https://validation.vixxolink.com';
const usersApiOrigin = 'https://validation.vixxolink.com/keymaster';
const nodeOrigin = 'http://localhost';
export const environment = {
  production: false,
  version: git.version,
  revision: git.revision,
  branch: git.branch,
  vixxoApi: 'https://validation-api.vixxolink.com/latest',
  userManagementApi: 'https://validation-api.vixxo.com/v2/auth',
  gatewayBaseURL: 'https://test.vixxo.com',
  googlePlacesApi: `${apiOrigin}/maps/places`,
  GoogleStaticMapLocationApiKey: 'AIzaSyBdNezxtpFQhhEXuDzPVnZhf__kxb4QCM8',
  GoogleStaticMapLocationUrl: 'https://maps.googleapis.com/maps/api',
  GoogleStaticMapLocationMarkerUrl:
    'https://validation.vixxolink.com/images/Mobile-StaticMap-LocationMarker.png',
  proxyApi: `${apiOrigin}/api`,
  proxyEApi: `${apiOrigin}/eapi`,
  proxyAws: `${apiOrigin}/aws`,
  usersProxyApi: usersApiOrigin,
  AUTH0_CLIENT_DOMAIN: 'vixxo-dev.auth0.com',
  AUTH0_REDIRECT: `${origin}/callback`,
  AUTH0_SCOPE: 'openid profile email',
  AUTH0_RESPONSE_TYPE: 'token id_token',
  AUTH0_RESPONSE_MODE: 'fragment',
  AUTH0_APP_ORIGIN: apiOrigin,
  AUTH0_URL_APP_BASE: origin,
  AUTH0_TOKEN_URL: 'https://vixxo-dev.auth0.com/oauth/token',
  AUTH0_GRANT_TYPE: 'password',
  AUTH0_CLIENT_ID: 'rxIBPFeDkYHzCOBnkkqNLtaVJ5hkxUSl',
  AUTH0_AUDIENCE: 'https://validation-api.vixxo.com/',
  AUTH0_USERNAME: 'sctest@vixxo.com',
  AUTH0_PASSWORD: 'i9xB5QTFZiH5',
  AUTH0_RENEW_URI: `${apiOrigin}/silent`,
  cloudStorageContainer: 'biz-myfsn-attachments-invoice-test',
  env: 'dev',
  SR_NOTE_EMAIL_FROM: 'vixxolinkdev@vixxo.com',
  customerSupportNumber: '877-372-9455',
  siteKey: '6LfMskMhAAAAAOZ_RPQsSIkNpRr0m-EPvVd99X-M',
  AllowedServiceProviderNumbers: [
    '64469',
    '22338',
    '22365',
    '22344',
    '22353',
    '22354',
    '22355',
    '22609',
    '22614',
    '22360',
    '22362',
    '22363',
    '22364',
    '22367',
    '22403',
    '22466',
    '22503',
    '22602',
    '22603',
    '22605',
    '22606',
    '22608',
    '22610',
    '22611',
    '22612',
    '22615',
    '22616',
    '22446',
    '22616'
  ],
  authApi: `${nodeOrigin}/token`
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
