import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { AuthService } from '../modules/security/service/auth.service';
import { ServicerequestService } from './servicerequest.service';
import { AssetService } from './asset.service';
import { LocalStorageKeys } from '../shared/model/constants/local-storage-keys';
import { ServiceRequestDetailModel } from '../shared/services/models/service-request-detail';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicerequestGuard implements CanActivate {
  private serviceRequestNumber: string;
  private serviceProviderNumber: string;
  private assetId: string;
  private siteId: string;
  public isLoading: boolean;
  public isNavigationFromAsset:boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private serviceRequestService: ServicerequestService,
    private localStorageService: LocalStorageService,
    private assetService: AssetService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    this.serviceRequestNumber = route?.parent?.params['serviceRequestNumber'];
    this.assetId = route?.parent?.params['assetId'];
    this.siteId = route?.parent?.params['siteId'];
    this.serviceProviderNumber = route.queryParams['spNumber'];
    this.isLoading = true;

    // Initial Guard Code
    return this.isAuthenticated();
  }

  private isAuthenticated(): any {
    if (this.assetId && this.siteId) {
      return this.auth.login().pipe(
        map((res: any) => {
          this.localStorageService.writeLocalStorage(
            LocalStorageKeys.AccessToken,
            res.access_token
          );
          return res;
        }),
        switchMap(res =>
          forkJoin({
            asset: this.assetService.getAssetByAssetId(this.assetId),
            serviceRequest: this.serviceRequestService.getServiceRequest(
              this.serviceRequestNumber
            )
          }).pipe(
            map(
              r => {
                this.isLoading = false;
                if (
                  r.asset != null &&
                  r.asset.isPcr2MachineProduct &&
                  r.serviceRequest &&
                  r.serviceRequest.results &&
                  r.asset.siteId == this.siteId &&
                  environment.AllowedServiceProviderNumbers.includes(
                    r.serviceRequest.results.serviceProviderNumber
                  )
                ) {
                  this.localStorageService.writeLocalStorage(
                    this.serviceRequestNumber +
                      '-' +
                      this.assetId +
                      '-' +
                      LocalStorageKeys.MachineProductId,
                    r.asset.machineProductId
                  );
                  {
                    this.localStorageService.writeLocalStorage(
                      this.serviceRequestNumber +
                        '-' +
                        this.assetId +
                        '-' +
                        LocalStorageKeys.ServiceRequestIssue,
                      r.serviceRequest.results.shortDescription
                    );
                  }
                  let serializedServiceRequest: string = JSON.stringify(<
                    ServiceRequestDetailModel
                  >r.serviceRequest.results);
                  this.localStorageService.writeLocalStorage(
                    this.serviceRequestNumber +
                      '-' +
                      this.assetId +
                      '-' +
                      LocalStorageKeys.ServiceRequestObject,
                    serializedServiceRequest
                  );
                  return true;
                } else if (
                  (r.asset != null &&
                  r.asset.isPcr2MachineProduct &&
                  this.serviceRequestNumber &&
                  !environment.AllowedServiceProviderNumbers.includes(
                    r.serviceRequest.results.serviceProviderNumber
                  )) || (!r.asset.isPcr2MachineProduct && this.serviceRequestNumber)
                ) {
                  const route = '/servicerequest/' + this.serviceRequestNumber;
                  this.router.navigateByUrl(route);
                  this.isNavigationFromAsset = true;
                  return true;
                }
                else if (
                  this.serviceProviderNumber &&
                  r.serviceRequest.results.serviceProviderNumber ==
                    this.serviceProviderNumber
                ) {
                  const route =
                    '/servicerequest/' +
                    this.serviceRequestNumber +
                    '?spNumber=' +
                    this.serviceProviderNumber;
                  this.router.navigateByUrl(route);
                  return true;
                } else {
                  this.router.navigateByUrl('/401');
                  return false;
                }
              },
              catchError(err => {
                this.router.navigateByUrl('/401');
                return throwError(() => err.statusText);
              })
            )
          )
        )
      );
    } else {
      return this.auth
        .login()
        .pipe(
          map((res: any) => {
            this.localStorageService.writeLocalStorage(
              LocalStorageKeys.AccessToken,
              res.access_token
            );
            return res;
          }),
          mergeMap(res =>
            this.serviceRequestService.getServiceRequest(
              this.serviceRequestNumber
            )
          )
        )
        .pipe(
          map(serviceRequest => {
            this.isLoading = false;
            if (
              serviceRequest.results.serviceProviderNumber ==
                this.serviceProviderNumber ||
              this.isNavigationFromAsset ||
              environment.AllowedServiceProviderNumbers.includes(
                serviceRequest.results.serviceProviderNumber
              )
            ) {
              return true;
            } else {
              this.router.navigateByUrl('/401');
              return false;
            }
          }),
          catchError(err => {
            this.router.navigateByUrl('/401');
            return throwError(() => err.statusText);
          })
        );
    }
  }
}
