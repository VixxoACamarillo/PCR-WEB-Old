/**
 * Bind events calls across the entire App
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class NotifierService {
  private subject = new Subject();

  broadcast(event: any) {
    this.subject.next(event);
  }

  on(eventName: any, callback: any) {
    let subscription = this.subject
      .pipe(
        filter((value: any) => {
          return value.name === eventName;
        })
      )
      .subscribe(callback);
    return () => {
      subscription.remove(subscription);
      subscription.unsubscribe();
    };
  }
}
