import { FormElementChoice } from './form-element-choice.model';
import { Priority } from './priority.model';

export class FormElementChoicePriority {
  id: number;
  customerNumber: string;
  formElementChoiceId: number;
  priorityId: number;
  priority: Priority;
  formElementChoice: FormElementChoice;

  constructor(formElementChoicePriorityJson: any) {
    this.id = formElementChoicePriorityJson.id;
    this.formElementChoiceId = formElementChoicePriorityJson.text;
    this.priorityId = formElementChoicePriorityJson.impact;
  }
}
