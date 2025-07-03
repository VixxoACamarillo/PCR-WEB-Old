import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAlphaNumeric]'
})
export class AlphaNumericDirective {
  private regex: RegExp = new RegExp(/[^a-zA-Z0-9_ ]/gi);
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(this.regex, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
