import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutRequest } from 'src/app/store/actions/authentication/auth.actions';
import * as GAuth from 'src/app/store/actions/authentication/google-auth.actions';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass'],
})
export class TopNavigationComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}

  logOut() {
    if (localStorage.getItem('authType') === 'googleAuth') {
      this.store.dispatch(new GAuth.LogoutRequest());
    } else {
      this.store.dispatch(new LogoutRequest());
    }
  }
}
