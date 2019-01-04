import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './containers/profile/profile.component'
import { HeaderComponent } from './components/header/header.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { SharedModule } from '@app/shared/shared.module'

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  declarations: [ProfileComponent, HeaderComponent]
})
export class ProfileModule {}
