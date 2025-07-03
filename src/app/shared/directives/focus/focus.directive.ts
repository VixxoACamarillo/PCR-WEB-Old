import {
  Directive,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

@Directive({ selector: '[appFocus]' })
export class FocusDirective implements OnChanges {
  @Input() appFocus: any;
  @Input() isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isFocused'] && changes['isFocused'].currentValue) {
      this.renderer.selectRootElement(
        this.hostElement.nativeElement
      ).focus()
    }
  }
}
