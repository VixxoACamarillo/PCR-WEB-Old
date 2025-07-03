import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private proxyEAPIUrl = environment.proxyEApi;

  /**
   * Constructor
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the List of actions by partIds
   * @param  partIds
   *
   * @returns {Observable<any>}
   */
  public getActionsByPartIds(selectedParts: []): Observable<any> {
    let params = {
      partIds: selectedParts
    };

    return this.httpClient.post(`${this.proxyEAPIUrl}/pcr/pcrActions`, params);
  }
}
