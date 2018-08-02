import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class MetaEffects {

  constructor(private actions$: Actions) {}
}
