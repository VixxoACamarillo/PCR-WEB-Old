import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpProgressEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { of, concat, delay } from 'rxjs';

import { environment } from '../../../environments/environment';

const SERVICE_REQUEST_API = environment.proxyApi;

// Kendo Upload - Remove Event
export const REMOVE_URL = 'removeUrl';

@Injectable()
export class HttpImageInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === `${SERVICE_REQUEST_API}/file`) {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map(x =>
        of(<HttpProgressEvent>{
          type: HttpEventType.UploadProgress,
          loaded: x,
          total: 100
        }).pipe(delay(1000))
      );

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === REMOVE_URL) {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
