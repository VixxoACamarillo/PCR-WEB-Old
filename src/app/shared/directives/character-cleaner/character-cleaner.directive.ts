/**
 *  Validates the value entered in an Input (input, textarea)
 *  by default it accepts Alphabetic and Spaces, just add more to the list of const
 *
 *  Use:  <input appCharacterCleaner pattern='THE REGEX' />
 */
import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgModel } from '@angular/forms';

// Alphabetic and Spaces
export const ALPHABETIC = /([^a-zA-Z\s])/gi;
export const ALPHANUMERIC = /([^a-zA-Z0-9\s-])/gi;
// Event Type
export const KEYUP = 'keyup';

@Directive({
  selector: '[appCharacterCleaner]',
  providers: [NgModel]
})
export class CharacterCleanerDirective {
  // Default pattern
  @Input() pattern: RegExp = ALPHABETIC;
  // Applies any change to the ngModel
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  // Event Type
  @Input() eventType = '';

  constructor(private ngModel: NgModel) {}

  /**
   * Verify the input value has the proper pattern
   * @param e
   */
  @HostListener('blur') onBlur() {
    this.validatePattern();
  }

  /**
   * Verify the event is the same
   * @param e
   */
  @HostListener('keyup') onKeyEnter() {
    if (this.eventType === KEYUP) {
      this.validatePattern();
    }
  }

  private validatePattern(): void {
    const value = this.ngModel.model;
    // to void empty values
    if (value) {
      let result = value.replace(this.pattern, '');
      this.ngModel.model = result;
      this.ngModelChange.emit(this.ngModel.model);
    }
  }
}
