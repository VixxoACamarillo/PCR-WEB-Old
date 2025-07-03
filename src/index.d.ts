declare module '@elastic/apm-rum-angular' {
  import { Router } from '@angular/router';
  import { Injectable } from '@angular/core';

  export interface ApmUserContext {
    id?: string | number;
    username?: string;
    email?: string;
  }

  export interface Apm {
    setUserContext(userContext: ApmUserContext): any;
  }

  export interface ApmConfig {
    serviceName?: string;
    serverUrl?: string;
    serviceVersion?: string;
    distributedTracingOrigins?: string[];
    environment?: string;
    enabled?: boolean;
    secretToken?: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ApmService {
    static apm: Apm;

    constructor(router: Router);

    init(config: ApmConfig): Apm;
  }
}
