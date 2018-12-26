import {Action} from '@ngrx/store'
import {Track} from "@app/shared/models/track.model"

export enum TrackActionTypes {
  LoadTrack = '[Track] Load Track',
  LoadTrackSuccess = '[Track] Load Track Success',
  LoadTrackFail = '[Track] Load Track Fail',
}

export class LoadTrack implements Action {
  readonly type = TrackActionTypes.LoadTrack;
}

export class LoadTrackSuccess implements Action {
  readonly type = TrackActionTypes.LoadTrackSuccess;

  constructor(public payload: { tracks: Track[] }) {
  }
}

export class LoadTrackFail implements Action {
  readonly type = TrackActionTypes.LoadTrackFail;

  constructor(public payload: { error: any }) {
  }
}

export type TrackActions = LoadTrack | LoadTrackSuccess | LoadTrackFail
