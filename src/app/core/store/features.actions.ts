import { Action } from '@ngrx/store'
import { Features } from '@app/shared/models/features.model'

export enum FeaturesActionTypes {
  LoadFeatures = '[Features] Load Features',
  LoadFeaturesSuccess = '[Features] Load Features Success',
  LoadFeaturesFail = '[Features] Load Features Fail'
}

export class LoadFeatures implements Action {
  readonly type = FeaturesActionTypes.LoadFeatures
}

export class LoadFeaturesSuccess implements Action {
  readonly type = FeaturesActionTypes.LoadFeaturesSuccess
  constructor(public payload: { features: Features[] }) {}
}

export class LoadFeaturesFail implements Action {
  readonly type = FeaturesActionTypes.LoadFeaturesFail
  constructor(public payload: { error: any }) {}
}

export type FeaturesActions = LoadFeatures | LoadFeaturesSuccess | LoadFeaturesFail
