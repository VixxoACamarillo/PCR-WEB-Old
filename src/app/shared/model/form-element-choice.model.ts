import { ImpactType } from './impact-type.model';
import { Priority } from './priority.model';
export class FormElementChoice {
  id: number;
  text: string;
  impact: ImpactType;
  priorities?: Priority[];
  constructor(formElementChoiceJson: any) {
    this.id = formElementChoiceJson.id;
    this.text = formElementChoiceJson.text;
    this.impact = formElementChoiceJson.impact;
    this.priorities = formElementChoiceJson.priorities;
  }
}
