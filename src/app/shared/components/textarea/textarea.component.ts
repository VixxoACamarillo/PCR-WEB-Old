import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AuthService } from '../../../modules/security/service/auth.service';

type Profile = {
  name: string;
  picture: string;
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() value: String;
  @Input() label: String;
  @Input() inline: Boolean;
  @Input() requirementLabel: String;
  @Input() placeholder: String = '';
  @Input() defaultValue: String = '';
  @Input() inputId: String;
  @Input() modalFooter: Boolean = false;
  @Input() autofocus: Boolean = false;
  @Input() profile: Profile;
  @Input() maxlength: 1000;
  @Input() isProfileFixed: boolean = false;
  @Output() valueUpdated = new EventEmitter();
  @Output() blur = new EventEmitter();

  private focusedDefaultValue: String;
  public isSPUser: boolean = false;

  constructor(private authService: AuthService) {}

  /**
   * Emit back the value to the Model
   * @param $event
   */
  public valueChanged($event: any) {
    const eventData = {
      value: $event,
      defaultValue: this.defaultValue
    };

    this.valueUpdated.emit(eventData);
  }

  public handleFocus($event: any) {
    if (this.defaultValue && !$event.target.value) {
      $event.target.value = this.defaultValue;
      // Save the current state of the defaultValue on focus for cases when there is a timestamp in the value.
      this.focusedDefaultValue = this.defaultValue;
    }
  }

  /**
   * Allows the user to type before send back the value
   * @param $event
   */
  public handleBlur($event: any) {
    $event.target.value = $event.target.value.trim();

    if (this.focusedDefaultValue === $event.target.value) {
      $event.target.value = '';
      this.focusedDefaultValue = '';
    }

    this.valueChanged($event.target.value);
    if (this.blur) {
      this.blur.emit();
    }
  }
}
