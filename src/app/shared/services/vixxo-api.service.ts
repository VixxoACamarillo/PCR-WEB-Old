import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* Modules */
import { Router } from '@angular/router';
/* Services */
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EMPTY, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from '../../../../node_modules/rxjs/operators';
import { environment } from '../../../environments/environment';
import { SrPriorityUtils } from '../utils/sr-priority.utils';
/* Utils */
import { CommonUtils } from '../../shared/utils/common.utils';

const SERVICE_REQUEST_API = environment.proxyApi;
const EAPI = environment.proxyEApi;

/*  TODO remove
 *  This class is completely wrong, the headers and all information regarding the API
 *  should be injected in the HTTP Interceptor, attaching every request to the header is wrong as well since there
 *  is a global configuration for it.
 */
@Injectable()
export class VixxoApiService {
  profile: any;

  /**
   * Constructor
  getInvoices(params: { serviceRequestNumber: string; serviceProviderNumber: any; }) {
    throw new Error("Method not implemented.");
  }
  postInvoice(params: { serviceRequestNumber: string; serviceProviderNumber: any; }) {
    throw new Error("Method not implemented.");
  }
   * @param http
   */
  constructor(
    private store: Store<any>,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.store.select('user').subscribe(state => {});
  }

  /**
   * Error Handler
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    if (error.status === 401) {
      this.router.navigate(['access-unauthorized']);
      return of([]);
    } else {
      return throwError(() => error);
    }
  }

  /**
   * Default params for POST request
   * @returns {{pageNumber: number, pageSize: number}}
   */
  private defaultParams() {
    return {
      pageNumber: 1,
      pageSize: 100
    };
  }

  private getAPIURL(endpoint: string) {
    return `${SERVICE_REQUEST_API}/${endpoint}`;
  }

  private getEAPIURL(endpoint: string) {
    return `${EAPI}/${endpoint}`;
  }

  private deleteRequest(endpoint: string) {
    if (!endpoint) {
      return false;
    }
    const url = this.getAPIURL(endpoint);
    return this.httpClient.delete(url).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  // TODO all of this should be at the http interceptor level, wrong, wrong, wrong
  public getRequest(endpoint: string):Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getAPIURL(endpoint);
    return this.httpClient.get(url).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  // TODO all of this should be at the http interceptor level
  public getHttpResponse(endpoint: string): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getAPIURL(endpoint);
    return this.httpClient.get(url, { observe: 'response' }).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  // TODO all of this should be at the http interceptor level, wrong, wrong, wrong
  public postRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getAPIURL(endpoint);
    return this.httpClient.post(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  public getEAPIRequest(endpoint: string): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getEAPIURL(endpoint);
    return this.httpClient.get(url).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  public postEAPIRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getEAPIURL(endpoint);
    return this.httpClient.post(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  // TODO all of this should be at the http interceptor level, wrong, wrong, wrong
  private putRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getAPIURL(endpoint);
    return this.httpClient.put(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  private putEAPIRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getEAPIURL(endpoint);
    return this.httpClient.put(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  private patchEAPIRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getEAPIURL(endpoint);
    return this.httpClient.patch(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  private deleteEAPIRequest(endpoint: string, params: Object = {}): Observable<any> {
    if (!endpoint) {
      return of();
    }
    const url = this.getEAPIURL(endpoint);
    return this.httpClient.delete(url, params).pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  /**
   * Service Request Legal Value Suggestions
   */
  getServiceRequestSuggestion(params: any = {}): any {
    const { field, value } = params;
    if (!field || !value) {
      return;
    }
    const URI = encodeURI(
      `serviceRequests/suggestion?field=${field}&value=${value}`
    );
    return this.getRequest(URI);
  }

  /**
   * Service Request Detail
   * @returns {any}
   */
  getServiceRequestDetail(serviceRequestNumber: string): Observable<any> {
    if (!serviceRequestNumber) {
      return of();
    }
    return this.getRequest(`serviceRequest/${serviceRequestNumber}`);
  }

  getPMServiceRequestDetail(serviceRequestNumber: string): Observable<any> {
    if (!serviceRequestNumber) {
      return of();
    }
    return this.getEAPIRequest(`pm/${serviceRequestNumber}`);
  }

  updateServiceRequestDetail(serviceRequestNumber: string, params: any): any {
    if (!serviceRequestNumber) {
      return;
    }
    return this.putRequest(`serviceRequest/${serviceRequestNumber}`, params);
  }

  updateEAPIServiceRequestDetail(
    serviceRequestNumber: string,
    params: any
  ): any {
    if (!serviceRequestNumber) {
      return;
    }
    return this.putEAPIRequest(
      `serviceRequest/${serviceRequestNumber}`,
      params
    );
  }

  /**
   * GET Service Request Notes
   */
  getServiceRequestNotes(serviceRequestNumber: string): any {
    if (!serviceRequestNumber) {
      return;
    }
    return this.getRequest(`serviceRequest/${serviceRequestNumber}/notes`);
  }

  /**
   * GET Service Request Labor Types
   */
  getServiceRequestLaborTypes(serviceRequestNumber: string): Observable<any> {
    if (!serviceRequestNumber) {
      return of();
    }
    return this.getEAPIRequest(
      `serviceRequestService/serviceRequest/${serviceRequestNumber}/laborTypes`
    ).pipe(catchError(() => of([])));
  }

  /**
   * POST Service Request Notes
   */
  postServiceRequestNote(serviceRequestNumber: string, params: any): any {
    if (!serviceRequestNumber || !params) {
      return;
    }
    return this.postRequest(
      `serviceRequest/${serviceRequestNumber}/note`,
      params
    );
  }

  postSendEmailNote(params: any): any {
    if (!params) {
      return;
    }
    return this.postRequest(`email`, params);
  }

  /**
   * GET Service Request Attachments
   */
  getServiceRequestAttachments(serviceRequestNumber: string) {
    return this.getEAPIRequest(
      `serviceRequest/${serviceRequestNumber}/attachments`
    ).pipe(
      map((response: any) => (!response ? [] : response.results)),
      catchError(() => of([]))
    );
  }

  deleteServiceRequestAttachment(
    serviceRequestNumber: string,
    attachmentId: string
  ): any {
    if (!serviceRequestNumber || !attachmentId) {
      return;
    }
    return this.deleteRequest(
      `serviceRequest/${serviceRequestNumber}/attachment/${attachmentId}`
    );
  }

  /**
   * GET Service Request - Invoice Attachments
   */
  getServiceRequestInvoiceAttachments(serviceRequestNumber: string) {
    return this.getRequest(
      `attachments/${serviceRequestNumber}?type=invoice`
    ).pipe(catchError(() => of([])));
  }

  /**
   * GET Service Request - Quote Attachments
   */
  getServiceRequestQuoteAttachments(serviceRequestNumber: string) {
    return this.getRequest(
      `attachments/${serviceRequestNumber}?type=quote`
    ).pipe(catchError(() => of([])));
  }

  /**
   * POST Service Request Attachment
   */
  postServiceRequestAttachment(
    serviceRequestNumber: string,
    attachment: any,
    subType: string = 'general'
  ): any {
    if (!serviceRequestNumber || !attachment.key || !attachment.location) {
      return;
    }
    const params = {
      key: attachment.key,
      type: 'serviceRequest',
      subType: subType,
      url: attachment.location
    };
    return this.postRequest(
      `serviceRequest/${serviceRequestNumber}/attachment`,
      params
    );
  }

  /**
   * POST Service Request Visit
   */
  postServiceRequestVisit(serviceRequestNumber: string, params: any): any {
    const respondEmpty = () => EMPTY;
    const isMissingLocation = !params.latitude || !params.longitude; // Location required for type: 'in' and 'out'

    if (
      !serviceRequestNumber ||
      !params.type ||
      (params.type !== 'estimatedArrival' && isMissingLocation)
    ) {
      return respondEmpty();
    }

    if (params.type === 'in') {
      params = {
        type: 'in',
        update: params.update,
        latitude: params.latitude || null,
        longitude: params.longitude || null
      };
    } else if (params.type === 'out') {
      params = {
        type: 'out',
        update: params.update,
        latitude: params.latitude || null,
        longitude: params.longitude || null,
        isJobComplete: params.isJobComplete,
        TechnicianCount: params.technicianCount
      };
    } else if (params.type === 'estimatedArrival') {
      if (!params.timestamp) {
        return respondEmpty();
      }
      params = {
        type: 'estimatedArrival',
        update: params.update,
        timestamp: params.timestamp
      };
    } else {
      console.log(
        `postServiceRequestVisit:: Error - params type of ${
          params.type
        } is not supported`
      );
      return;
    }

    if (params.update) {
      return this.putRequest(`time/${serviceRequestNumber}`, params);
    } else {
      return this.postRequest(`time/${serviceRequestNumber}`, params);
    }
  }

  /**
   * POST Create Release Service Request
   */
  public postCreateReleaseServiceRequest(
    serviceRequestNumber: string
  ): Observable<any> {
    return this.postEAPIRequest(
      `serviceRequestService/serviceRequest/${serviceRequestNumber}/release`
    );
  }

  /**
   * Cancel Service Request
   */
  public cancelServiceRequest(serviceRequestNumber: string): Observable<any> {
    if (!serviceRequestNumber) {
      return of();
    }
    return this.deleteEAPIRequest(
      `serviceRequestService/serviceRequest/${serviceRequestNumber}`
    );
  }

  /**
   * POST Service Request Incomplete Reason
   */
  postServiceRequestIncompleteReason(
    serviceRequestNumber: string,
    params: any
  ) {
    if (!serviceRequestNumber) {
      return false;
    }
    return this.postRequest(
      `time/${serviceRequestNumber}/incompleteReason`,
      params
    );
  }

  /**
   * Lines Of Service
   * @param srNumber
   */
  getLinesOfService() {
    return this.getRequest(`linesOfService`);
  }

  /**
   * Line Of Service detail by ID
   * @param linesOfServiceById
   */
  getLineOfServiceById(linesOfServiceById: string): Observable<any> {
    if (!linesOfServiceById) {
      return of();
    }
    return this.getEAPIRequest(`lineOfService/${linesOfServiceById}`);
  }

  uploadFile(serviceRequestNumber: string, params: any): Observable<any> {
    if (params.filename) {
      params.filename = CommonUtils.ReplaceSpecialChar(params.filename);
    }
    return this.postRequest('file', params);
  }

  /**
   * Get Customer Sites
   * Get the entire list of sites based on the customer numbers
   */
  public getCustomerSites(): Observable<any[]> {
    let customerNumbers = this.profile.userMetadata.customer
      ? this.profile.userMetadata.customer.customerNumbers
      : [];
    let customerSites: any[] = [];
    customerNumbers.forEach((customerNumber: any) => {
      customerSites.push(this.getRequest(`customer/${customerNumber}/sites`));
    });

    return new Observable(observer => {
      if (customerNumbers.length === 0) {
        observer.next([]);
        observer.complete();
      }

      forkJoin(customerSites).subscribe((allCustomerSites: any) => {
        observer.next([].concat.apply([], allCustomerSites));
        observer.complete();
      });
    });
  }

  /**
   * Get list of all customers
   */
  public getCustomers(): Observable<any> {
    return this.getRequest('customers');
  }

  public getEULAAcceptanceStatus(): Observable<any> {
    return this.getHttpResponse('user/licenseAcceptance');
  }

  public acceptEULA(params: any) {
    return this.postRequest('user/licenseAcceptance', params).pipe(
      map((_: any) => true),
      catchError(() => of(false))
    );
  }

  public getReasonTypes(categoryType: string) {
    return this.getRequest('reasonTypes?reasonCategoryType=' + categoryType);
  }

  /**
   * requires serviceRequestNumber to fetch associated service items
   * @param serviceRequestNumber
   */
  public getLineItems(invoiceId: string): Observable<any> {
    return this.getEAPIRequest(`invoice/${invoiceId}/lineitems`);
  }

  /**
   * requires serviceRequestNumber to fetch associated service items
   * @param serviceRequestNumber
   */
  public getServiceItems(serviceRequestNumber: string): Observable<any> {
    return this.getEAPIRequest(
      `serviceItems?serviceRequestNumber=${serviceRequestNumber}`
    ).pipe(catchError(() => of([])));
  }

  /**
   * requires lineItemId to delete associated line item
   * @param lineItemId
   */
  public deleteLineItem(
    invoiceId: string,
    lineItemId: string
  ): Observable<any> {
    const url = this.getEAPIURL(`invoice/${invoiceId}/lineitem/${lineItemId}`);
    return this.httpClient.delete(url);
  }
  /**
   * requires assetId to fetch associated asset info
   * @param assetId
   */
  public getAssetInfo(assetId: string): Observable<any> {
    return this.getRequest(`asset/${assetId}`).pipe(catchError(() => of([])));
  }

  public getServiceProviderName(serviceProviderNumber: string) {
    return this.getEAPIRequest(
      `serviceProvider/${serviceProviderNumber}`
    ).pipe(catchError(() => of([])));
  }

  public postPMMonthlyAggregationDetail(params: any): Observable<any> {
    if (!params) {
      return of();
    }
    return this.postEAPIRequest('pmReport/PmMonthlyBucket', params);
  }

  public getRelatedSRs(params: any): Observable<any> {
    if (!params) {
      return of();
    }
    return this.getEAPIRequest(
      `serviceRequestService/serviceRequest/${
        params.srNumber
      }/related?pageNumber=${params.pageNumber}&pageSize=${
        params.pageSize
      }&sortColumn=${params.sortColumn}&sortDirection=${params.sortDirection}`
    ).pipe(catchError(() => of([])));
  }

  public getServiceRequestServiceAttachments(srNumber: any): Observable<any> {
    if (!srNumber) {
      return of();
    }
    return this.getEAPIRequest(
      `serviceRequestService/serviceRequest/${srNumber}/attachments`
    ).pipe(catchError(() => of([])));
  }

  public putSRDecision(srNumber: string, params: any): Observable<any> {
    if (!srNumber || !params) {
      return of();
    }
    return this.putEAPIRequest(
      `serviceRequestService/serviceProvider/${srNumber}/decision`,
      params
    );
  }

  public postCallBackSR(params: any, srNumber: string): Observable<any> {
    if (!params || !srNumber) {
      return of();
    }
    return this.postEAPIRequest(
      `serviceRequestService/serviceProvider/serviceRequest/${srNumber}/callback`,
      params
    );
  }
  public patchSRDetails(srNumber: string, params: any): Observable<any> {
    if (!srNumber || !params) {
      return of();
    }

    return this.patchEAPIRequest(
      `serviceRequestService/serviceRequest/${srNumber}`,
      params
    );
  }

  public getCustomerSiteContacts(
    customerNumber: string,
    siteId: string
  ): Observable<any> {
    if (!customerNumber || !siteId) {
      return of();
    }
    return this.getEAPIRequest(
      `customerService/customer/${customerNumber}/site/${siteId}/contacts`
    );
  }
}
