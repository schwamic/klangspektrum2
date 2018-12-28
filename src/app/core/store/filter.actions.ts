import { Action } from '@ngrx/store'
import { Filter } from '@app/shared/models/filter.model'
export enum FilterActionTypes {
  UpdateFilter = '[Filter] Update Filter'
}

export class UpdateFilter implements Action {
  readonly type = FilterActionTypes.UpdateFilter
  constructor(public payload: Filter) {}
}

export type FilterActions = UpdateFilter
