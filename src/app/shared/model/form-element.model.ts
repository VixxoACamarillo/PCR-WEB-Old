import { FormElementType } from './form-element-type.model';
import { FormElementChoice } from './form-element-choice.model';

export class FormElement {
  id: number;
  text: string;
  type: FormElementType;
  childElements?: FormElement[];
  choices?: FormElementChoice[];

  constructor(formElementJson: any) {
    this.id = formElementJson.id;
    this.text = formElementJson.text;
    this.type = formElementJson.type;
    this.choices = [];
    if (formElementJson.choices) {
      formElementJson.choices.forEach((element: any) => {
        this.choices.push(new FormElementChoice(element));
      });
    }
    this.childElements = [];
    if (formElementJson.childElements) {
      formElementJson.childElements.forEach((element: any) => {
        this.childElements.push(new FormElement(element));
      });
    }
  }

  public get isSelfHelp() {
    return this.type === FormElementType.Page && this.text === 'Self Help';
  }
}
