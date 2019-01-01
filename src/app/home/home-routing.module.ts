import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LandingpageComponent } from './components/landingpage/landingpage.component'
import { HomeComponent } from './containers/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { ImprintComponent } from './components/imprint/imprint.component'
import { DeactivateLoadingGuard } from '@app/core/guards/deactivate-loading-guard.guard'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [DeactivateLoadingGuard],
        component: LandingpageComponent
      },
      { path: 'about', component: AboutComponent },
      { path: 'imprint', component: ImprintComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DeactivateLoadingGuard]
})
export class HomeRoutingModule {}
