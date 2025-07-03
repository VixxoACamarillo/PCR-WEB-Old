// Angular
import { Injectable } from '@angular/core';

@Injectable()
export class DataTransferService {
  private utilityData: any;

  /**
   * dataTransferUtility
   */
  public dataTransferUtility(data: any) {
    this.utilityData = data;
  }

  /**
   * getDataTransferUtility
   */
  public getDataTransferUtility() {
    return this.utilityData;
  }

  /**
   * Clears service info
   */
  public clearDataUtilityService() {
    this.utilityData = null;
  }
}
