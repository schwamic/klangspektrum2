import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromMeta from './meta.reducer';
import * as fromProfile from './profile.reducer';

export interface State {
  meta: fromMeta.State,
  profile: fromProfile.State,

}

export const reducers: ActionReducerMap<State> = {
  meta: fromMeta.reducer,
  profile: fromProfile.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
