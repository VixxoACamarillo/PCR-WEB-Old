import { FormType } from './form-type.model';
import { FormElement } from './form-element.model';

export class Form {
  id: number;
  name: string;
  type: FormType;
  formElements: FormElement[];

  constructor(formJson: any) {
    this.id = formJson.id;
    this.name = formJson.name;
    this.type = formJson.type;
    this.formElements = [];
    if (formJson.formElements) {
      formJson.formElements.forEach((element: any) => {
        this.formElements.push(new FormElement(element));
      });
    }
  }
}
