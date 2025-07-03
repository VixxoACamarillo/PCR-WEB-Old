/**
 * Angular Interceptor with HttpClient
 */
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
// Model
import { AlertType } from '../model/alert.model';
// Service
import { NotifierService } from '../services/notifier.service';
import { LocalStorageService } from '../services/local-storage.service';
// Other
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { REMOVE_URL } from '../../modules/service-request-detail/http-image-interceptor.service';
import { AuthService } from '../../modules/security/service/auth.service';
import { LocalStorageKeys } from '../model/constants/local-storage-keys';

export const APPLICATION_JSON = 'application/json';
export const SERVICE_REQUEST_API = environment.proxyApi;

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private notifierService: NotifierService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      // Already handled by HttpImageInterceptorService
      request.url === REMOVE_URL ||
      // No API related like resources and assets
      (request.url.indexOf('/api/') === -1 &&
        request.url.indexOf('/eapi/') === -1)
    ) {
      // Let the flow continue for specific type of requests
      return next.handle(request);
    }

    // All API Requests
    return this.handleRequest(request, next);
  }

  /**
   * Listen to all Request to provide the Loader and Validation Handler
   * @param request
   * @param next
   */
  private handleRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get Authorization Header
    let accessToken = this.localStorageService.readLocalStorage(
      LocalStorageKeys.AccessToken
    );
    if (!accessToken) {
      this.authService.login().subscribe((res: any) => {
        this.localStorageService.writeLocalStorage(
          LocalStorageKeys.AccessToken,
          res.access_token
        );
        accessToken = this.localStorageService.readLocalStorage(
          LocalStorageKeys.AccessToken
        );
      });
    }

    let contentType = APPLICATION_JSON;
    // Verify this request is as JSON, if not, do not overwrite the original request
    let originalRequestType = request.headers.get('Content-Type');
    if (
      originalRequestType !== null &&
      originalRequestType !== APPLICATION_JSON
    ) {
      contentType = originalRequestType;
    }

    let authReq = request.clone({
      setHeaders: {
        'Content-Type': contentType,
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.notifierService.broadcast({
          name: AlertType.ERROR,
          message: error
        });
        return throwError(error);
      })
    );
  }
}

export function HttpFactory(
  notifierService: NotifierService,
  localStorageService: LocalStorageService,
  authService: AuthService
) {
  return new HttpRequestInterceptor(
    notifierService,
    localStorageService,
    authService
  );
}
