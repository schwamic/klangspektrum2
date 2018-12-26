import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LandingpageComponent } from './components/landingpage/landingpage.component'
import { HomeComponent } from './containers/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { ImprintComponent } from './components/imprint/imprint.component'

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', pathMatch: 'full', component: LandingpageComponent},
      {path: 'about', component: AboutComponent},
      {path: 'imprint', component: ImprintComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
