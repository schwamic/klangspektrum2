import {Action} from '@ngrx/store';

interface Image {
  height: number,
  url: string,
  width: number
}

export interface State {
  // todo use normalize to add a flat state? or map opject in guard?
  displayName: string,
  external_urls: {}
  followers: number,
  href: string,
  id: string,
  images: Image[],
  type: string,
  uri: string
}

export const initialState: State = {
  displayName: null,
  external_urls: null,
  followers: null,
  href: null,
  id: null,
  images: null,
  type: null,
  uri: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}

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
