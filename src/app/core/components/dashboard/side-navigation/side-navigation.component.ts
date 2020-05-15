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
        count: null
      },
      {
        name: 'Friends',
        route: 'friends',
        count: this.user.friends.length
      },
      {
        name: 'Friend Requests',
        route: 'friendreq',
        count: this.user.friendRequests.length
      },
      {
        name: 'Pending Requests',
        route: 'pending',
        count: this.user.friendRequestsPending.length
      }
    ];
  }

  ngOnChanges(changes) {
    console.log(changes);

    this.actions = [
      {
        name: 'Find users',
        route: 'users',
        count: null
      },
      {
        name: 'Friends',
        route: 'friends',
        count: this.user.friends.length
      },
      {
        name: 'Friend Requests',
        route: 'friendreq',
        count: this.user.friendRequests.length
      },
      {
        name: 'Pending Requests',
        route: 'pending',
        count: this.user.friendRequestsPending.length
      }
    ];
  }

}
