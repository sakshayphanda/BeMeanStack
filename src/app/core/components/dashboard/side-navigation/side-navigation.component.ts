import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit, OnChanges {

  @Input('user') user: IUserInfo;
  actions = [];
  constructor() { }

  ngOnInit() {
    this.actions = [
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
  }

  ngOnChanges(changes) {
    console.log(changes);

    this.actions =[
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
  }

}
