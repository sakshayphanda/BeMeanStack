import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListUsersComponent } from "./components/dashboard/dynamic-routes/list-users/list-users.component";
import { FriendsComponent } from "./components/dashboard/dynamic-routes/friends/friends.component";
import { FeedComponent } from "./components/dashboard/dynamic-routes/feed/feed.component";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "",
    component: AuthenticationComponent,
    children: [
      {
        path: "feed",
        component: FeedComponent,
      },
      {
        path: "users",
        component: ListUsersComponent,
      },
      {
        path: "friends",
        component: FriendsComponent,
      },
      {
        path: "feed",
        component: FeedComponent,
      },
      { path: "**", redirectTo: "" },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
