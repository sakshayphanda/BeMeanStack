import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

interface IActions {
  name: string;
  route: string;
  count: number;
  params: any;
}
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit, OnChanges {

  @Input('user') user: IUserInfo;
  actions: IActions[] = [];
  constructor() { }

  ngOnInit() {
    this.actions = this.getActions();
  }

  ngOnChanges() {
    this.actions = this.getActions();
  }

  getActions(): IActions[] {
    const actions = [
      {
        name: 'News Feed',
        route: 'feed',
        count: null,
        params: {user: this.user._id}
      },
      {
        name: 'Find users',
        route: 'users',
        count: null,
        params: {user: this.user._id}
      },
      {
        name: 'Friends',
        route: 'friends',
        count: this.user.friends.length,
        params: false
      },
      {
        name: 'Friend Requests',
        route: 'friendRequests',
        count: this.user.friendRequests.length,
        params: false
      },
      {
        name: 'Pending Requests',
        route: 'friendRequestsPending',
        count: this.user.friendRequestsPending.length,
        params: false
      }
    ];

    return actions;
  }

}
