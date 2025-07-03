// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
// State
import { Store } from '@ngrx/store';
// JWT
import * as auth0 from 'auth0-js';
import * as JWT from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
// Services
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { NotifierService } from '../../../shared/services/notifier.service';
import { VixxoApiService } from '../../../shared/services/vixxo-api.service';
import { UserService } from '../../users/service/user.service';
import { AuthMetadata } from '../model/auth-metadata.model';

// Models
import { Group } from '../model/group.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageKeys } from '../../../shared/model/constants/local-storage-keys';

export const USER_PROFILE_SET_NOTIFIER_ID = 'userProfileSet';


@Injectable()
export class AuthService {
  loggedIn: boolean = false;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  refreshSubscription: any;
  auth0 = new auth0.WebAuth({
    clientID: environment.AUTH0_CLIENT_ID,
    domain: environment.AUTH0_CLIENT_DOMAIN
  });
  acceptedEULA: boolean | null;
  acceptedEULAResponse: any | null;

  /**
   * Constructor
   * @param router
   */
  constructor(
    private router: Router,
    private store: Store<any>,
    private localStorageService: LocalStorageService,
    private vixxoApi: VixxoApiService,
    private userService: UserService,
    private notifierService: NotifierService,
    private ngZone: NgZone,
    private httpClient: HttpClient
  ) {
    // If authenticated, set local profile property and update login status subject
    if (this.isAuthenticated()) {
      const profile = JSON.parse(
        this.localStorageService.readLocalStorage('profile')
      );
      //this.store.dispatch(new AuthActions.SetProfile(profile));
      this.setLoggedIn(true);
    }
  }

  /**
   * Is Current User Authenticated?
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    // Check whether the current time is past the token's expiry time
    const expiresAt = JSON.parse(
      this.localStorageService.readLocalStorage('expiresAt')
    );

    if (expiresAt) {
      const date = new Date().getTime();
      return date < expiresAt;
    }
    return false;
  }

  /**
   * Does the user have Customer Group Access?
   * @returns {boolean}
   */
  public hasUserCustomerGroup(): boolean {
    return this.userHasGroup(Group.CUSTOMER);
  }

  /**
   * Does the user have Service Center Group Access?
   * @returns {boolean}
   */
  public hasUserServiceCenterGroup(): boolean {
    return this.userHasGroup(Group.SERVICE_CENTER);
  }

  public getUserMetadata(): any {
    return this.userService.userMetadata;
  }
  /**
   * Retrieve from the profile all Groups associated with the user
   * @returns {Array<any>}
   */
  private getUserGroupsAccessLevel(): Array<any> {
    if (
      this.localStorageService.readLocalStorage(LocalStorageKeys.AccessToken)
    ) {
      let groups = JWT(
        this.localStorageService.readLocalStorage(LocalStorageKeys.AccessToken)
      );
      return groups[AuthMetadata.GROUP_METADATA];
    }
    return Array<any>();
  }

  /**
   * Set User as Logged In
   * @param value
   */
  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  /**
   * Login
   */
  login() {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    };

    const token = environment.authApi;

    return this.httpClient.post(token, '', options);
  }

  /**
   * After the user has logged on into the System
   * Depending their Groups it should be redirected
   * @param authResult
   */
  public initialRouteToLandingPage(): void {
    this.router.navigate(['/401']);
  }
  /**
   * Check if current user in session contains a specific group.
   * @param group
   * @returns {boolean}
   */
  public userHasGroup(group: string): boolean {
    let groups = this.getUserGroupsAccessLevel();
    return groups.find(r => r === group) ? true : false;
  }

  public setRedirectUrl(url: any) {
    this.localStorageService.writeLocalStorage(
      LocalStorageKeys.RedirectUrl,
      url
    );
  }

  public getRedirectUrl() {
    return this.localStorageService.readLocalStorage(
      LocalStorageKeys.RedirectUrl
    );
  }

  public clearRedirectUrl() {
    this.localStorageService.writeLocalStorage(
      LocalStorageKeys.RedirectUrl,
      ''
    );
  }
}
