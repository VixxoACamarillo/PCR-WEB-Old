/**
 * Created by Jorge Morayta
 */

import { Injectable } from '@angular/core';

/**
 * Intended to be a helper to convert specific data for the SR that is being used on several places
 */
@Injectable()
export class SrPriorityUtils {
  /**
   * Used to convert the real color of the priority
   * it got a class and
   * @param event
   */
  public static getPriorityColorClass(data: any): string {
    const priority =
      data.type === 'Preventative Maintenance' ||
      data.type === 'PreventativeMaintenance'
        ? 'Preventative Maintenance'
        : data.priority;
    let initials = priority.match(/\b\w|\d/g) || [];
    return initials.length > 2
      ? initials.slice(0, 2).join('')
      : initials.join('');
  }
}
