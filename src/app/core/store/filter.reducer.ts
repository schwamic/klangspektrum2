import { FilterActionTypes, FilterActions } from './filter.actions'

export interface State {
  accousticness: number[]
  danceability: number[]
  energy: number[]
  instrumentalness: number[]
  liveness: number[]
  speechiness: number[]
  valence: number[]
}

export const initialState: State = {
  accousticness: [0, 1],
  danceability: [0, 1],
  energy: [0, 1],
  instrumentalness: [0, 1],
  liveness: [0, 1],
  speechiness: [0, 1],
  valence: [0, 1]
}

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {
    case FilterActionTypes.UpdateFilter: {
      return { ...action.payload }
    }
    default:
      return state
  }
}
