import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PartsSearchModel } from '../model/parts-search-model';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private proxyEAPIUrl = environment.proxyEApi;

  /**
   * Constructor
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the List of current Parts by the url param
   * @param {any} params
   *
   * @returns {Observable<any>}
   */
  public getPartsByParam(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (let key of Object.keys(params)) {
      httpParams = httpParams.set(key, params[key]);
    }

    return this.httpClient.get(
      `${this.proxyEAPIUrl}/parts?${httpParams.toString()}`
    );
  }
}
