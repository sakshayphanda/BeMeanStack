import { NgModule } from '@angular/core';
import { SideNavigationComponent } from './components/dashboard/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/dashboard/top-navigation/top-navigation.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SharedModule } from '../modules/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    SideNavigationComponent,
    TopNavigationComponent,
    AuthenticationComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class CoreModule { }
