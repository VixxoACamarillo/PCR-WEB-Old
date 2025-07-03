import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VixxoApiService } from './vixxo-api.service';
import { SiteModel } from '../components/site-location-map/models/site.model';
import { Store } from '@ngrx/store';

export interface SearchParams {
  serviceRequestNumber?: string[];
  type?: string;
  lineOfService?: string[];
  serviceProvider?: any[];
  priority?: string[];
  siteNamesOnMetadata?: any[];
  siteNamesOnSearch?: any[];
  subStatus?: string[];
  customerNumber?: string[];
  completionSLA?: string[];
  responseSLA?: string[];
  issue?: string[];
  dateRange?: string[];
  expectedCompletionDate?: string;
}

interface LineOfService {
  id: string;
  name: string;
}

interface Issue {
  id: string;
  name: string;
}

interface SiteName {
  id: string;
  name: string;
}

interface ServiceProvider {
  id: string;
  name: string;
}

@Injectable()
export class SearchService {
  linesOfService: LineOfService[] = [];
  customerSites: SiteModel[] = [];
  profile: any;
  issue: Issue[] = [];
  siteNames: SiteName[] = [];
  serviceProviders: ServiceProvider[] = [];

  constructor(
    private httpClient: HttpClient,
    private vixxoApiService: VixxoApiService,
    private store: Store<any>
  ) {
    this.store.select('user').subscribe(state => {});
  }

  getLinesOfService(isCustomer: boolean, customerNumber?: number) {
    if (this.linesOfService.length > 0 && !isCustomer) {
      return of(this.linesOfService);
    } else if (isCustomer && customerNumber) {
      //LoS API for the customer login
      return this.httpClient
        .get<LineOfService[]>(
          `${environment.proxyApi}/customer/${customerNumber}/linesOfService`
        )
        .pipe(
          map(response => {
            this.linesOfService = response;
            return this.linesOfService;
          })
        )
    } else {
      return this.httpClient
        .get<LineOfService[]>(`${environment.proxyApi}/linesOfService`)
        .pipe(map(response => {
          this.linesOfService = response;
          return this.linesOfService;
        }))
    }
  }

  getServiceProviders() {
    if (this.serviceProviders.length > 0) {
      return of(this.serviceProviders);
    } else {
      return this.httpClient
        .get<ServiceProvider[]>(`${environment.proxyApi}/serviceProviders`)
        .pipe(map(response => {
          this.serviceProviders = response;
          return this.serviceProviders;
        }))
      
    }
  }

  getSites() {
    if (this.customerSites.length > 0) {
      return of(this.customerSites);
    } else {
      return this.vixxoApiService.getCustomerSites().pipe(map(response => {
        this.customerSites = response;
        return this.customerSites;
      }));
    }
  }

  getIssues(query: string) {
    return this.httpClient
      .get<Issue[]>(`${environment.proxyEApi}/issues?query=${query}`)
      .pipe(
        map(
          (response: any) => (this.issue = !response ? [] : response.results)
        ),
        catchError(() => of([]))
      );
  }

  public getSiteBySearch(searchString: string) {
    return this.httpClient
      .get<SiteName[]>(
        `${environment.proxyApi}/sites?searchString=${searchString}`
      )
      .pipe(map(response => {
        this.siteNames = response;
        return this.siteNames;
      }))
      
  }
}
