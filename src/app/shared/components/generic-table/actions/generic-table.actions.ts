/**
 * Service Requests Actions
 *  Within a store application, all user interaction that would cause a state update must be expressed in the form
 * of actions. All relevant user events are dispatched as actions, flowing through the action pipeline defined by store,
 * before a new representation of state is output. This process occurs each time an action is dispatched,
 * leaving a complete, serializable representation of application state changes over time.
 */

import { Action } from '@ngrx/store';
import { ApiServiceTypes, QueryNames } from '../effects/generic-table.effects';

export const LOAD = '[generic-grid] Load';
export const LOAD_SUCCESS = '[generic-grid] Load success';
export const LOAD_ERROR = '[generic-grid] Load error';

/**
 * Generic grid
 * LOAD
 * @class Load
 * @implements {Action}
 */
export class Load implements Action {
  readonly type = LOAD;
  constructor(
    public payload: { pageSize: number; [x: string]: any },
    public queryName: QueryNames,
    public apiServiceType: ApiServiceTypes
  ) {}
}

/**
 * Generic grid
 * LOAD Success
 * @class LoadSuccess
 * @implements {Action}
 */
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: any, public queryName: QueryNames) {}
}

/**
 * Generic grid
 * LOAD Error
 * @class LoadError
 * @implements {Action}
 */
export class LoadError implements Action {
  readonly type = LOAD_ERROR;
  constructor(public payload: any, public queryName: QueryNames) {}
}

/**
 * Actions type
 * @type {Actions}
 */
export type Actions = Load | LoadSuccess | LoadError;
