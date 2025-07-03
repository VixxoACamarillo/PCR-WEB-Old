// Angular
import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Other
import { Observable, forkJoin, from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, map, bufferCount } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const SERVICE_REQUEST_API = environment.proxyApi;
const EAPI = environment.proxyEApi;

@Injectable()
export class UserService {
  private profile: any;
  public userMetadata: any;

  constructor(private store: Store<any>, private httpClient: HttpClient) {
    this.store.select('user').subscribe(state => {});
  }

  /**
   * Get the User Profile from the Store, so we avoid the user of the Store on each component.
   */
  public getProfile(): any {
    return this.profile;
  }

  /**
   * Get the User Information including metadata and sites
   * @param userId
   */
  public getUserInfo(userId: string): Observable<any> {
    return this.httpClient.get(`${EAPI}/user/${userId}/metadata`).pipe(
      map((response: any) => (!response ? null : response.results.value.user)),
      catchError(() => of(null))
    );
  }

  /**
   * Get the List of users
   * TODO: Changes for the real endpoint
   */
  public getUserList(): Observable<any[]> {
    return from([]).pipe(bufferCount([].length));
  }

  /**
   * Get the List of sites based on the customer number
   * TODO: Changes for the real endpoint
   */
  public getRolesList(): Observable<any[]> {
    return from([]).pipe(bufferCount([].length));
  }
}
