import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component'
import { MetaGuard } from '@app/core/guards/meta.guard'
import { ErrorComponent } from '@app/shared/components/error/error.component'


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'callback', canActivate: [MetaGuard], component: ErrorComponent},
  {path: 'visualization', loadChildren: './visualization/visualization.module#VisualizationModule'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MetaGuard]
})

export class AppRoutingModule {
}
