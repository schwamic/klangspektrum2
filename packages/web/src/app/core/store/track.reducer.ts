import {TrackActions, TrackActionTypes} from '@app/core/store/track.actions'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {Track} from '@app/shared/models/track.model'

export interface State extends EntityState<Track> {
  loaded: boolean,
  error: string
}

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>()


export const initialState: State = adapter.getInitialState({
  loaded: false,
  error: null
})

export function reducer(state = initialState, action: TrackActions): State {
  switch (action.type) {

    case TrackActionTypes.LoadTrackSuccess: {
      return adapter.addMany(action.payload.tracks, {...state, loaded: true})
    }

    case TrackActionTypes.LoadTrackFail: {
      return {
        ...state,
        loaded: false,
        error: action.payload.error
      }
    }

    default:
      return state;
  }
}

export const getLoaded = (state: State) => state.loaded
