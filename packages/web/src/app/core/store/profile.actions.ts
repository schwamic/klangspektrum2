import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  LoadProfiles = '[Profile] Load Profiles'
}

export class LoadProfiles implements Action {
  readonly type = ProfileActionTypes.LoadProfiles;
}

export type ProfileActions = LoadProfiles;
