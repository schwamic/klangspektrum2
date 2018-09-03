import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { metaReducers, reducers } from '@app/core/store'
import { ProfileEffects } from '@app/core/store/profile.effects'
import { TrackEffects } from '@app/core/store/track.effects'
import { FeaturesEffects } from '@app/core/store/features.effects'
import { httpInterceptorProviders } from '@app/core/http-interceptors'
import { environment } from '@env/environment'
import { NotFoundComponent } from './components/not-found/not-found.component'


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([ProfileEffects, TrackEffects, FeaturesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [NotFoundComponent],
  providers: [httpInterceptorProviders]
})
export class CoreModule {}
