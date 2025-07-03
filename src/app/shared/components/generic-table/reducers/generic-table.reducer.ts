/**
 * A reducer is a pure function, accepting two arguments, the previous state and an action with a type and
 * optional data (payload) associated with the event. Using the previous analogy,
 * if store is to be thought of as your client side database, reducers can be considered the tables in said database.
 * Reducers represent sections, or slices of state within your application and should be structured and composed
 * accordingly.
 TODO: consider refactoring opportunities to generalize state definitions and actions to cleanup duplicates among
 reducers in the app.
 */

import * as GenericTableActions from '../actions/generic-table.actions';

export interface State {
  data?: any[];
  error?: Error;
  loading: boolean;
  initialized: boolean;
}

const initialState: State = {
  loading: false,
  initialized: false
};

export class GenericTableReducer {
  mapQueries:any = {};
  constructor(queries: string[]) {
    queries.map((query:any) => {
      this.mapQueries[query] = { ...initialState };
      return this.mapQueries[query];
    });
  }
  getReducer() {
    return (state = this.mapQueries, action: GenericTableActions.Actions) => {
      switch (action.type) {
        case GenericTableActions.LOAD:
          state[action.queryName] = {
            ...state[action.queryName],
            data: [],
            error: undefined,
            loading: true,
            initialized: false
          };
          break;

        case GenericTableActions.LOAD_SUCCESS:
          state[action.queryName] = {
            ...state[action.queryName],
            data: action.payload,
            error: undefined,
            loading: false,
            initialized: true
          };
          break;
        case GenericTableActions.LOAD_ERROR:
          state[action.queryName] = {
            ...state[action.queryName],
            error: action.payload,
            loading: false,
            initialized: false
          };
          break;

        default:
          break;
      }

      return { ...state };
    };
  }
}
