import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {metaReducers, reducers} from "@app/core/store";
import {environment} from "@env/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ProfileEffects} from "@app/core/store/profile.effects";
import {TrackEffects} from "@app/core/store/track.effects";
import {httpInterceptorProviders} from "@app/core/http-interceptors";
import {FeaturesEffects} from "@app/core/store/features.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProfileEffects, TrackEffects, FeaturesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [HeaderComponent, NotFoundComponent],
  providers: [httpInterceptorProviders]
})
export class CoreModule { }
