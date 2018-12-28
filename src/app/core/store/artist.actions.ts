import { Action } from '@ngrx/store'

export enum ArtistActionTypes {
  LoadArtists = '[Artist] Load Artists'
}

export class LoadArtists implements Action {
  readonly type = ArtistActionTypes.LoadArtists
}

export type ArtistActions = LoadArtists
