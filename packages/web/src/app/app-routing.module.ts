import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
