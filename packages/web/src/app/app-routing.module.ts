import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {NotFoundComponent} from '@app/core/components/not-found/not-found.component'


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './modules/home//home.module#HomeModule'},
  {
    path: 'visualization',
    loadChildren: './modules/visualization/visualization.module#VisualizationModule'
  },
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
