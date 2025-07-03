import {
  AfterContentInit,
  Directive,
  EventEmitter,
  Output
} from '@angular/core';

@Directive({ selector: '[appAfterNgIf]' })
export class AfterNgIfDirective implements AfterContentInit {
  @Output() appAfterNgIf: EventEmitter<AfterNgIfDirective> = new EventEmitter();

  public ngAfterContentInit(): void {
    setTimeout(() => {
      // timeout helps prevent unexpected change errors
      this.appAfterNgIf.emit(this);
    });
  }
}
