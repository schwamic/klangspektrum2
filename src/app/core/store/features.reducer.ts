import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {Features} from '@app/shared/models/features.model'
import {FeaturesActions, FeaturesActionTypes} from "@app/core/store/features.actions";


export interface State extends EntityState<Features>{
  loaded: boolean,
  error: string
}

export const adapter: EntityAdapter<Features> = createEntityAdapter<Features>()

export const initialState: State = adapter.getInitialState({
  loaded: false,
  error: null
})

export function reducer(state = initialState, action: FeaturesActions): State {
  switch (action.type) {

    case FeaturesActionTypes.LoadFeaturesSuccess: {
      return adapter.addMany(action.payload.features, {...state, loaded: true})
    }

    case FeaturesActionTypes.LoadFeaturesFail: {
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
