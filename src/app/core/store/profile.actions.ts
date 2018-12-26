import { Action } from '@ngrx/store';
import {Profile} from "@app/shared/models/profile.model";

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profiles',
  LoadProfileSuccess = '[Profile] Load Profiles Success',
  LoadProfileFail = '[Profile] Load Profiles Fail'
}

export class LoadProfile implements Action {
  readonly type = ProfileActionTypes.LoadProfile;
}

export class LoadProfileSuccess implements Action {
  readonly type = ProfileActionTypes.LoadProfileSuccess;
  constructor(public payload: {profile: Profile}){}
}

export class LoadProfileFail implements Action {
  readonly type = ProfileActionTypes.LoadProfileFail;
  constructor(public payload: {error: any}){}
}

export type ProfileActions = LoadProfile | LoadProfileSuccess | LoadProfileFail;
