import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {NotFoundComponent} from '@app/core/components/not-found/not-found.component'
import {ProfileGuard} from "@app/core/guards/profile.guard";
import {VisualizationComponent} from "@app/visualization/containers/visualization/visualization.component";
import {DetailViewComponent} from "@app/visualization/containers/detail-view/detail-view.component";

const routes: Routes = [
  {path: '', canActivate: [ProfileGuard], component: VisualizationComponent},
  {path: ':attribute/:value', canActivate: [ProfileGuard], component: DetailViewComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard]
})

export class VisualizationRoutingModule{
}
