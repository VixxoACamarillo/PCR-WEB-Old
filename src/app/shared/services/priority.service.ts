/**
 * Get Priorities per Customer and keep a reference per session to speed up load time
 */
// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Models
import { SERVICE_REQUEST_API } from '../providers/http-request-interceptor.provider';
// Others
import { forkJoin, Observable, from, of } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../modules/users/service/user.service';

@Injectable()
export class PriorityService {
  private prioritySubject = new BehaviorSubject([]);
  private lastPriorityList: any = [];

  /**
   * Load the User Profile on the initial Load
   * @param httpClient
   * @param store
   */
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  /**
   * Get the new set of classes that represent the priority colors
   * @param data
   * @param priorities
   */
  public getPriorityOrderColorClass(
    data: any,
    priorityList: any = this.lastPriorityList
  ): string {
    if (
      data.type === 'Preventative Maintenance' ||
      data.type === 'PreventativeMaintenance'
    ) {
      return 'priority-color-pm';
    } else if (data.priority) {
      let priority = priorityList.find((p: any) => p.name === data.priority);
      if (priority) {
        return 'priority-color-' + priority.priorityOrder;
      }
    }
    return '';
  }

  /**
   * Get priority color for donut chart data, which is priority-based
   */
  public getPriorityOrderColorClassByPriority(
    data: any,
    priorityList: any
  ): string {
    if (data) {
      let priority = priorityList.find((p: any) => p.name === data);
      if (priority) {
        return 'priority-color-' + priority.priorityOrder;
      }
    }
    return '';
  }

  /**
   * Get the initial list of all priorities for the current logged user
   */
  private initializePriorities(): Observable<any[]> {
    let customerNumbers =
      this.userService.userMetadata !== undefined &&
      this.userService.userMetadata.customer !== undefined
        ? this.userService.userMetadata.customer.customerNumbers
        : [];
    let customerPriorityObservables: any[] = [];

    // Create a list of observables
    customerNumbers.forEach((customerNumber: any) => {
      customerPriorityObservables.push(
        this.httpClient
          .get(`${SERVICE_REQUEST_API}/customer/${customerNumber}/priorities`)
          .pipe(
            map((response: any) => (!response ? [] : response)),
            catchError(() => of([]))
          )
      );
    });

    return new Observable(observer => {
      if (customerNumbers.length === 0) {
        observer.next([]);
        observer.complete();
      }

      // Wait for all observables to finish and then flatten and combine the results into one array
      forkJoin(customerPriorityObservables).subscribe(
        (allCustomerPriorities: any) => {
          this.lastPriorityList = [].concat.apply([], allCustomerPriorities);

          // Get distinct priorities between calls to the endpoint for each customerNumber
          this.lastPriorityList = Array.from(
            new Set(this.lastPriorityList.map((priority: any) => priority.name))
          ).map(priority1 => {
            return this.lastPriorityList.find(
              (priority2: any) => priority2.name === priority1
            );
          });

          // Return the value to the code that triggered this call
          observer.next(this.lastPriorityList);
          observer.complete();
        }
      );
    });
  }

  /**
   * Get one single priority based on the Issue and Add it to the existing list
   * @param customerNumber
   * @param issueId
   */
  public getPriorityByIssue(
    customerNumber: string,
    issueId: string
  ): Observable<any> {
    return this.httpClient.get(
      `${SERVICE_REQUEST_API}/customer/${customerNumber}/priority?issueId=${issueId}`
    );
  }

  /**
   * Utility method that retrieve the Priority Color for an SR that includes itself the Customer number and priority name
   * this is used in places like the SR Detail that is not necessary the logged user so the information needs to being  retrieved at once
   * we do not store the priority since each can have completely different configuration with same name
   * @param customerNumber
   * @param priorityName
   */
  public getPriorityColorForServiceRequest(data: any): Observable<any> {
    return new Observable(observer => {
      this.httpClient
        .get(
          `${SERVICE_REQUEST_API}/customer/${data.customer.number}/priorities`
        )
        .pipe(
          map((response: any) => (!response ? [] : response)),
          catchError(() => of([]))
        )
        .subscribe((priorities: any) => {
          observer.next(this.getPriorityOrderColorClass(data, priorities));
          observer.complete();
        });
    });
  }

  /**
   * Get the priority behaviorSubject observable, retrieve the priorities value if there is no detected value
   */
  public getPriorities(): Observable<any> {
    if (this.prioritySubject.getValue().length === 0) {
      // Return the prioritySubject observable instead of the regular observable that's returned by initializePriorities()
      // For the former, if a new value is pushed into the prioritySubject, then anyone who was subscribed
      // to the prioritySubject will also receive the value and execute their code again.
      // For a regular observable, the subscribe logic is only ran once.
      return this.initializePriorities().pipe(flatMap((priorityListSelectMany:any) => {
        // Set the value into the behaviorSubject for code that has subscribed to it already
        this.prioritySubject.next(priorityListSelectMany);

        return this.prioritySubject.asObservable();
      }));
    }

    return this.prioritySubject.asObservable();
  }

  /**
   * Retrieves priority list by customer
   * @param {string} customerNumber
   * @returns {Observable<any>}
   */
  public getPriorityList(customerNumber: String): Observable<any> {
    return this.httpClient
      .get(`${SERVICE_REQUEST_API}/customer/${customerNumber}/priorities`)
      .pipe(
        map((response: any) => (!response ? [] : response)),
        catchError(err => of([]))
      );
  }
}
