import { Action } from '@ngrx/store';
import {Meta} from "@app/shared/models/meta.model";

export enum MetaActionTypes {
  AddMeta = '[Meta] Add Meta'
}

export class AddMeta implements Action {
  readonly type = MetaActionTypes.AddMeta;
  constructor(public payload: Meta){}
}

export type MetaActions = AddMeta;
