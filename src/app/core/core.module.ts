import { NgModule } from '@angular/core';
import { SideNavigationComponent } from './components/dashboard/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/dashboard/top-navigation/top-navigation.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SharedModule } from '../modules/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListUsersComponent } from './components/dashboard/dynamic-routes/list-users/list-users.component';
import { DynamicRoutesComponent } from './components/dashboard/dynamic-routes/dynamic-routes.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    SideNavigationComponent,
    TopNavigationComponent,
    AuthenticationComponent,
    HomeComponent,
    LoginComponent,
    ListUsersComponent,
    DynamicRoutesComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class CoreModule { }
