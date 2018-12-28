import { ProfileActions, ProfileActionTypes } from '@app/core/store/profile.actions'
import { Profile } from '@app/shared/models/profile.model'

interface Image {
  height: number
  url: string
  width: number
}

export interface State {
  // todo use normalize to add a flat state? or map opject in guard?
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

//
// {
//   "display_name": null,
//   "external_urls": {
//   "spotify": "https://open.spotify.com/user/der-dirigent"
// },
//   "followers": {
//   "href": null,
//     "total": 5
// },
//   "href": "https://api.spotify.com/v1/users/der-dirigent",
//   "id": "der-dirigent",
//   "images": [
//   {
//     "height": null,
//     "url": "https://profile-images.scdn.co/images/userprofile/default/63451264f6912fe77508b25c9b190f5fd08f6777",
//     "width": null
//   }
// ],
//   "type": "user",
//   "uri": "spotify:user:der-dirigent"
// }
