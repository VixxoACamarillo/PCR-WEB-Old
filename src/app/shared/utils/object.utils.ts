/**
 * Created by Jorge Morayta
 */

import { Injectable } from '@angular/core';

/**
 * Intended to be a helper validation class that can be used
 * across all components in order to make common validations.
 */
@Injectable()
export class ObjectUtils {
  /**
   * Return the different values from comparing one list to another list
   * @param previousList
   * @param currentList
   */
  public static diffSelection(
    previousList: any,
    currentList: any,
    property: string
  ): any {
    return currentList.filter(
      (r: any) => !previousList.find((l: any) => r[property] === l[property])
    );
  }
}
