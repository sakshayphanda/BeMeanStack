import { Component, OnInit, Input } from '@angular/core';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  @Input('user') user: IUserInfo;
  actions = [
    {
      name: 'Find users',
      route: 'users'
    },
    {
      name: 'Friends',
      route: 'friends'
    },
    {
      name: 'Friend Requests',
      route: 'friendreq'
    },
    {
      name: 'Pending Requests',
      route: 'pending'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
