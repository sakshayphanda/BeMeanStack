import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DefaultAuth, GAuth } from 'src/app/store/actions';
import { AppState } from 'src/app/store/reducers';
import { authSelector } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass'],
})
export class AuthenticationComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: IAuthInfo;
  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      if (localStorage.getItem('authType') === 'googleAuth') {
        this.store.dispatch(
          new GAuth.CheckLoggedIn(localStorage.getItem('token'))
        );
      } else {
        this.store.dispatch(new DefaultAuth.LoginRequest(null));
        this.store.dispatch(new DefaultAuth.CheckLoggedIn());
      }
    }
    this.store.select(authSelector).subscribe((userDetails: IAuthInfo) => {
      console.log(userDetails);

      if (userDetails) {
        this.user = userDetails;
        this.authService.userDetails = userDetails.user;
        this.isLoggedIn = userDetails.loggedIn;
      }
    });
  }
}
