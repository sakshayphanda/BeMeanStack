import { NgModule } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SideNavigationComponent,
    TopNavigationComponent,
    AuthenticationComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class CoreModule { }
