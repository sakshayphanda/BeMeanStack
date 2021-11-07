import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authSelector } from 'src/app/store/selectors/auth.selector';
import { DefaultAuth } from 'src/app/store/actions';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { AppState } from 'src/app/store/reducers';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: IAuthInfo;
  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      this.store.dispatch(new DefaultAuth.LoginRequest(null));

      this.store.dispatch(new DefaultAuth.CheckLoggedIn());
    }
    this.store.select(authSelector).subscribe(
      (userDetails: IAuthInfo) => {
        if (userDetails) {
          this.user = userDetails;
          this.authService.userDetails = userDetails.user;
          this.isLoggedIn = userDetails.loggedIn;
        }
      }
    );
  }


}
