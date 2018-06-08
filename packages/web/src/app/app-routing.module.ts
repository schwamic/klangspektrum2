import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FirstComponent } from './first/container/first.component'
import { SecondComponent } from './second/container/second.component'

const routes: Routes = [
  {path: 'first', component: FirstComponent},
  {path: 'second', component: SecondComponent},
  // {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'first'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
