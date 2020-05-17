import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicRoutesComponent } from './components/dashboard/dynamic-routes/dynamic-routes.component';
import { ListUsersComponent } from './components/dashboard/dynamic-routes/list-users/list-users.component';
import { FriendsComponent } from './components/dashboard/dynamic-routes/friends/friends.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicRoutesComponent
  },
  {
    path: 'users',
    component: ListUsersComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'friendRequests',
    component: FriendsComponent
  },
  {
    path: 'friendRequestsPending',
    component: FriendsComponent
  },
  { path: '**',
    redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
