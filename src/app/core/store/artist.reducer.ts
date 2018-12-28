import { Action } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { Track } from '@app/shared/models/track.model'

export interface State {
  loaded: boolean
  error: string
}

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>()

export const initialState: State = adapter.getInitialState({
  loaded: false,
  error: null
})

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}

export const getLoaded = (state: State) => state.loaded
