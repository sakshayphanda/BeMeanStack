import { NgModule } from "@angular/core";
import { SideNavigationComponent } from "./components/dashboard/side-navigation/side-navigation.component";
import { TopNavigationComponent } from "./components/dashboard/top-navigation/top-navigation.component";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { SharedModule } from "../modules/shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ListUsersComponent } from "./components/dashboard/dynamic-routes/list-users/list-users.component";
import { DynamicRoutesComponent } from "./components/dashboard/dynamic-routes/dynamic-routes.component";
import { CoreRoutingModule } from "./core-routing.module";
import { FriendsComponent } from "./components/dashboard/dynamic-routes/friends/friends.component";
import { ChatComponent } from "./components/dashboard/dynamic-routes/chat/chat.component";
import { FeedComponent } from "./components/dashboard/dynamic-routes/feed/feed.component";
import { RightSideNavigationComponent } from "./components/dashboard/right-side-navigation/right-side-navigation.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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
  ],
  exports: [],
})
export class CoreModule {}
