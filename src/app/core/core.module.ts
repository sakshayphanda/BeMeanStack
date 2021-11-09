import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/dashboard/dynamic-routes/chat/chat.component';
import { DynamicRoutesComponent } from './components/dashboard/dynamic-routes/dynamic-routes.component';
import { FeedComponent } from './components/dashboard/dynamic-routes/feed/feed.component';
import { FriendsComponent } from './components/dashboard/dynamic-routes/friends/friends.component';
import { ListUsersComponent } from './components/dashboard/dynamic-routes/list-users/list-users.component';
import { RightSideNavigationComponent } from './components/dashboard/right-side-navigation/right-side-navigation.component';
import { SideNavigationComponent } from './components/dashboard/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/dashboard/top-navigation/top-navigation.component';
import { LoginComponent } from './components/login/login.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    SideNavigationComponent,
    TopNavigationComponent,
    AuthenticationComponent,
    LoginComponent,
    ListUsersComponent,
    DynamicRoutesComponent,
    FriendsComponent,
    ChatComponent,
    FeedComponent,
    RightSideNavigationComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [],
})
export class CoreModule {}
