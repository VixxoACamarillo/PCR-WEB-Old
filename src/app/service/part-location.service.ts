import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartLocationService {
  private proxyEApiUrl = environment.proxyEApi;

  constructor(private httpClient: HttpClient) {}

  public getLocation(partIds: any): Observable<any> {
    let partIdParams;
    if (!partIds) {
      return of();
    } else if (partIds) {
      partIdParams = this.setPartIdParams(partIds);
    }
    return this.httpClient.get(
      `${this.proxyEApiUrl}/pcr/partLocationPath?${partIdParams}`
    );
  }

  setPartIdParams(partIds: any) {
    return partIds
      .map((partId: any) => 'partIds=' + partId.toString())
      .join('&');
  }
}
