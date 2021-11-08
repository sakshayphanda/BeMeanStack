import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { FeedComponent } from './components/dashboard/dynamic-routes/feed/feed.component';
import { FriendsComponent } from './components/dashboard/dynamic-routes/friends/friends.component';
import { ListUsersComponent } from './components/dashboard/dynamic-routes/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'users',
        component: ListUsersComponent,
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
