import { ProfileActions, ProfileActionTypes } from '@app/core/store/profile.actions'

export interface State {
  birthdate: string
  country: string
  display_name: string
  email: string
  external_urls: {}
  followers: {}
  href: string
  id: string
  images: [{}]
  product: string
  type: string
  uri: string
  loaded: boolean
  error: string
}

export const initialState: State = {
  birthdate: null,
  country: null,
  display_name: null,
  email: null,
  external_urls: null,
  followers: null,
  href: null,
  id: null,
  images: null,
  product: null,
  type: null,
  uri: null,
  loaded: false,
  error: null
}

export function reducer(state = initialState, action: ProfileActions): State {
  switch (action.type) {
    case ProfileActionTypes.LoadProfileSuccess: {
      return {
        ...state,
        ...action.payload.profile,
        loaded: true,
        error: null
      }
    }
    case ProfileActionTypes.LoadProfileFail: {
      return {
        ...state,
        loaded: false,
        error: action.payload.error
      }
    }
    default:
      return state
  }
}

export const getLoaded = (state: State) => state.loaded
