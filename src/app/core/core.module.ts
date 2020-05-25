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
import { FriendsComponent } from './components/dashboard/dynamic-routes/friends/friends.component';
import { ChatComponent } from './components/dashboard/dynamic-routes/chat/chat.component';
import { FeedComponent } from './components/dashboard/dynamic-routes/feed/feed.component';

@NgModule({
  declarations: [
    SideNavigationComponent,
    TopNavigationComponent,
    AuthenticationComponent,
    HomeComponent,
    LoginComponent,
    ListUsersComponent,
    DynamicRoutesComponent,
    FriendsComponent,
    ChatComponent,
    FeedComponent
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
