// Angular
import { Injectable } from '@angular/core';
// Other
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LocalStorageService {
  constructor() {}

  /**
   * Error Handler
   * @param error
   * @returns {any}
   */
  handleError(error: Response | any): any {
    console.error('LocalStorage::handleError', error);
    return throwError(() => error);
  }

  /**
   * Function to check if localStorage is available
   * GET Storage availability
   */
  storageAvailable(): boolean {
    const storage = window['localStorage'];
    const x = '__storage_test__';
    try {
      // set and remove test item
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      // if unable to set & remove, pass error codes
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0
      );
    }
  }

  /**
   * Function to read localstorage
   */
  readLocalStorage(key: string): any {
    if (this.storageAvailable()) {
      return localStorage.getItem(key);
    }
    this.handleError(Response);
    return false;
  }

  /**
   * Function to write localstorage
   */
  writeLocalStorage(key: string, value: any): boolean {
    if (this.storageAvailable()) {
      localStorage.setItem(key, value);
      return true;
    }
    this.handleError(Response);
    return false;
  }

  /**
   * Function to write localstorage
   */
  deleteLocalStorage(key: string) {
    if (this.storageAvailable()) {
      localStorage.removeItem(key);
      return true;
    }
    this.handleError(Response);
    return false;
  }
}
