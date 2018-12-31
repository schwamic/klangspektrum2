import * as fromFeatures from './features.reducer'
import * as fromMeta from './meta.reducer'
import * as fromProfile from './profile.reducer'
import * as fromTrack from './track.reducer'
import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  meta: fromMeta.State
  profile: fromProfile.State
  tracks: fromTrack.State
  features: fromFeatures.State
}

export const reducers: ActionReducerMap<State> = {
  meta: fromMeta.reducer,
  profile: fromProfile.reducer,
  tracks: fromTrack.reducer,
  features: fromFeatures.reducer
}

export const metaReducers: MetaReducer<State>[] = []

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

// Combinations
export const selectExtendedProfile = createSelector(
  selectProfile,
  selectAccessToken,
  (profile, token) => {
    return { ...profile, token }
  }
)

export const selectTracksWithFeatures = createSelector(
  selectAllTracks,
  selectFeatures,
  (tracks, features) => {
    const tracksWithFeatures = tracks.map(track => {
      return { ...track, features: features.entities[track.id] }
    })
    return tracksWithFeatures
  }
)
