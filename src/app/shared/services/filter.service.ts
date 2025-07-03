import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { of } from 'rxjs';

/* Models */
import { Filter } from '../model/filter';

/* Services */
import { LocalStorageService } from './local-storage.service';

/* State */
import { Store } from '@ngrx/store';

@Injectable()
export class FilterService {
  private readonly tertiaryFilterRecentKey = 'tertiaryFilterRecent';
  private readonly filtersAppliedKey = 'filtersApplied';

  constructor(
    private store: Store<any>,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Error Handler
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    console.error('FilterService::handleError', error);
    return throwError(() => error);
  }

  /**
   * GET Tertiary Most Recently Searched
   * TODO: Read recentSearchTerms from session cookie
   */
  getTertiaryFilterRecentSearch(userName?: string): Observable<Filter[]> {
    // storage is available for use
    let buffer;
    // check if any search history exists
    if (userName) {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(
          `${this.tertiaryFilterRecentKey}-${userName}`
        )
      );
    } else {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(this.tertiaryFilterRecentKey)
      );
    }
    const parsedJSON = buffer ? buffer : [];
    return of(parsedJSON).pipe(catchError(this.handleError));
  }

  /**
   * UPDATE Tertiary Most Recently Searched
   */
  updateTertiaryFilterRecentSearch(
    recentSearchFilter: Filter,
    userName?: string
  ) {
    // update local storage
    let currentRecentSearch = [];
    if (userName) {
      currentRecentSearch = JSON.parse(
        this.localStorageService.readLocalStorage(
          `${this.tertiaryFilterRecentKey}-${userName}`
        )
      );
    } else {
      currentRecentSearch = JSON.parse(
        this.localStorageService.readLocalStorage(this.tertiaryFilterRecentKey)
      );
    }
    if (currentRecentSearch === null) {
      if (userName) {
        this.localStorageService.writeLocalStorage(
          `${this.tertiaryFilterRecentKey}-${userName}`,
          JSON.stringify([recentSearchFilter])
        );
        currentRecentSearch = JSON.parse(
          this.localStorageService.readLocalStorage(
            `${this.tertiaryFilterRecentKey}-${userName}`
          )
        );
      } else {
        this.localStorageService.writeLocalStorage(
          this.tertiaryFilterRecentKey,
          JSON.stringify([recentSearchFilter])
        );
        currentRecentSearch = JSON.parse(
          this.localStorageService.readLocalStorage(
            this.tertiaryFilterRecentKey
          )
        );
      }
    }
    currentRecentSearch = currentRecentSearch.filter(
      (filter: Filter) =>
        filter.value !== recentSearchFilter.value ||
        filter.field !== recentSearchFilter.field
    );
    currentRecentSearch.unshift(recentSearchFilter);

    if (userName) {
      this.localStorageService.writeLocalStorage(
        `${this.tertiaryFilterRecentKey}-${userName}`,
        JSON.stringify(currentRecentSearch)
      );
    } else {
      this.localStorageService.writeLocalStorage(
        this.tertiaryFilterRecentKey,
        JSON.stringify(currentRecentSearch)
      );
    }
  }

  /**
   * GET Applied Filter Options
   */
  getAppliedFilters(userName?: string) {
    let buffer;
    if (userName) {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(
          `${this.filtersAppliedKey}-${userName}`
        )
      );
    } else {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(this.filtersAppliedKey)
      );
    }
    const filterApplied = buffer ? buffer : [];
    return of(filterApplied).pipe(catchError(this.handleError));
  }

  updateAppliedFilters(filters: any, userName?: string) {
    // Do not save the SearchString a.k.a Text Search
    filters = filters.filter((filter: any) => filter.field !== 'searchString');

    if (userName) {
      this.localStorageService.writeLocalStorage(
        `${this.filtersAppliedKey}-${userName}`,
        JSON.stringify(filters)
      );
      return;
    }
    this.localStorageService.writeLocalStorage(
      this.filtersAppliedKey,
      JSON.stringify(filters)
    );
  }

  setAppliedFilter(filter: Filter, userName?: string) {
    let buffer;
    if (userName) {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(
          `${this.filtersAppliedKey}-${userName}`
        )
      );
    } else {
      buffer = JSON.parse(
        this.localStorageService.readLocalStorage(this.filtersAppliedKey)
      );
    }

    const filtersApplied = buffer ? buffer : [];
    // looking for an identical filter
    const filters = filtersApplied.filter((n: any) => {
      const containsField = n.field === filter.field;
      const containsValue = n.value === filter.value;
      return containsField && containsValue;
    });

    if (!filters.length) {
      filtersApplied.push(filter);
      if (userName) {
        this.updateAppliedFilters(filtersApplied, userName);
      } else {
        this.updateAppliedFilters(filtersApplied);
      }
    }
  }

  /**
   * GET Current Tertiary Filter Options
   */
  getTertiaryFilterOptions(fields?: any) {
    const options = [
      {
        filterLevel: 'tertiary',
        label: 'SR #',
        field: 'serviceRequestNumber',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Priority',
        field: 'priority',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Site Name',
        field: 'siteNamesOnMetadata',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Line of Service',
        field: 'lineOfService',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'SR Type: Preventative Maintenance',
        field: 'type',
        operator: 'eq',
        value: '',
        valueType: 'string'
      },
      {
        filterLevel: 'tertiary',
        label: 'SR Type: Repair',
        field: 'type',
        operator: 'eq',
        value: '',
        valueType: 'string'
      },
      {
        filterLevel: 'tertiary',
        label: 'Issue',
        field: 'Issue',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Sub Status',
        field: 'subStatus',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Created Date',
        field: 'dateRange',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'SLA Respond',
        field: 'responseSLA',
        operator: 'eq',
        value: '',
        valueType: 'single'
      },
      {
        filterLevel: 'tertiary',
        label: 'SLA Complete',
        field: 'completionSLA',
        operator: 'eq',
        value: '',
        valueType: 'single'
      },
      {
        filterLevel: 'tertiary',
        label: 'Customer Name',
        field: 'customerName',
        operator: 'eq',
        value: '',
        valueType: 'array'
      },
      {
        filterLevel: 'tertiary',
        label: 'Site Numbers',
        field: 'siteNumbers',
        operator: 'eq',
        value: '',
        valueType: 'array'
      }
    ];

    if (fields && Object.keys(fields).length > 0) {
      for (const key of Object.keys(fields)) {
        const optionFound = options.filter(option => option.field === key);
        if (optionFound.length > 0) {
          optionFound[0].value = fields[key];
        }
      }
    }

    return options;
  }
}
