import { Action } from '@ngrx/store'
import { MetaActions, MetaActionTypes } from '@app/core/store/meta.actions'

export interface State {
  access_token: string
  token_type: string
  expires_in: string
  state: string
}

export const initialState: State = {
  access_token: null,
  token_type: null,
  expires_in: null,
  state: null
}

export function reducer(state = initialState, action: MetaActions): State {
  switch (action.type) {
    case MetaActionTypes.AddMeta: {
      return {
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
        expires_in: action.payload.expires_in,
        state: action.payload.state
      }
    }
    default:
      return state
  }
}

export const getAccessToken = (state: State) => state.access_token
export const getTokenType = (state: State) => state.token_type
