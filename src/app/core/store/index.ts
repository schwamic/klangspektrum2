import * as fromFeatures from './features.reducer'
import * as fromMeta from './meta.reducer'
import * as fromProfile from './profile.reducer'
import * as fromTrack from './track.reducer'
import * as fromFilter from './filter.reducer'
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'

import { localStorageSync } from 'ngrx-store-localstorage'

// + Use SessionStorage instead of LocalStorage
// + lifetime: https://github.com/btroncone/ngrx-store-localstorage/issues/83
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['meta', 'profile', 'tracks', 'features', 'filter'],
    rehydrate: true,
    storage: sessionStorage
  })(reducer)
}

export interface State {
  meta: fromMeta.State
  profile: fromProfile.State
  tracks: fromTrack.State
  features: fromFeatures.State
  filter: fromFilter.State
}

export const reducers: ActionReducerMap<State> = {
  meta: fromMeta.reducer,
  profile: fromProfile.reducer,
  tracks: fromTrack.reducer,
  features: fromFeatures.reducer,
  filter: fromFilter.reducer
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer]

// Meta
export const selectMeta = createFeatureSelector<fromMeta.State>('meta')
export const selectAccessToken = createSelector(
  selectMeta,
  fromMeta.getAccessToken
)
export const selectTokenType = createSelector(
  selectMeta,
  fromMeta.getTokenType
)

// Profile
export const selectProfile = createFeatureSelector<fromProfile.State>('profile')
export const selectProfileLoaded = createSelector(
  selectProfile,
  fromProfile.getLoaded
)

// Tracks
export const selectTrack = createFeatureSelector<fromTrack.State>('tracks')
export const selectTrackLoaded = createSelector(
  selectTrack,
  fromTrack.getLoaded
)
export const { selectAll: selectAllTracks } = fromTrack.adapter.getSelectors(selectTrack)

// Features
export const selectFeatures = createFeatureSelector<fromFeatures.State>('features')
export const selectFeaturesLoaded = createSelector(
  selectFeatures,
  fromFeatures.getLoaded
)

// Filter
export const selectFilter = createFeatureSelector<fromFilter.State>('filter')

// Combinations
export const selectExtendedProfile = createSelector(
  selectProfile,
  selectAccessToken,
  (profile, token) => {
    return { ...profile, token }
  }
)
