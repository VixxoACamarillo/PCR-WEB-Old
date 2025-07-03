import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {
  public getPreviousUrl(): string {
    return sessionStorage.getItem('previousRoute') as string;
  }

  public setPreviousRoute(route: string) {
    sessionStorage.setItem('previousRoute', route);
  }

  public getRelatedServiceRequestNumber(): string {
    return sessionStorage.getItem('relatedServiceRequestNumber') as string;
  }

  public setRelatedServiceRequestNumber(serviceRequestNumber: string) {
    sessionStorage.setItem('relatedServiceRequestNumber', serviceRequestNumber);
  }
}
