/**
 * Status message being show
 */

export enum AlertType {
  EMPTY,
  SUCCESS,
  ERROR,
  INFO,
  WARNING
}

export class AlertModel {
  static alertType: AlertType;
  static message: string;
}
