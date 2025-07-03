import { git } from './git';
const origin = 'https://vixxolink.com';
const nodeOrigin = 'https://pcr.vixxolink.com';

export const environment = {
  production: true,
  version: git.version,
  revision: git.revision,
  branch: git.branch,
  vixxoApi: 'https://api.vixxolink.com/v1',
  proxyApi: `${origin}/api`,
  proxyEApi: `${origin}/eapi`,
  proxyAws: `${origin}/aws`,
  AUTH0_CLIENT_DOMAIN: 'vixxo.auth0.com',
  AUTH0_REDIRECT: `${origin}/callback`,
  AUTH0_SCOPE: 'openid profile email',
  AUTH0_RESPONSE_TYPE: 'token id_token',
  AUTH0_RESPONSE_MODE: 'fragment',
  AUTH0_TOKEN_URL: 'https://vixxo.auth0.com/oauth/token',
  AUTH0_GRANT_TYPE: 'password',
  AUTH0_CLIENT_ID: 'yw1Uu2I4SPGnnZqsoFHuR8AhIrVogNFp',
  AUTH0_AUDIENCE: 'https://api.vixxo.com/',
  AUTH0_USERNAME: 'pcrservicerequestuiprod@vixxo.com',
  AUTH0_PASSWORD: 'R9EP9lznnktKj9Ey',
  AUTH0_APP_ORIGIN: origin,
  AUTH0_URL_APP_BASE: origin,
  AUTH0_RENEW_URI: `${origin}/silent`,
  cloudStorageContainer: 'biz-myfsn-attachments-invoice',
  env: 'production',
  SR_NOTE_EMAIL_FROM: 'vixxolink@vixxo.com',
  customerSupportNumber: '877-372-9455',
  siteKey: '6LfMskMhAAAAAOZ_RPQsSIkNpRr0m-EPvVd99X-M',
  AllowedServiceProviderNumbers: [''],
  authApi: `${nodeOrigin}/token`
};
