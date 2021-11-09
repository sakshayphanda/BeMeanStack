import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { authSelector } from 'src/app/store/selectors/auth.selector';
import { DefaultAuth, FbAuth, GAuth } from '../../../store/actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  message: string;
  error: boolean;
  showSignUp: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      this.store.dispatch(new DefaultAuth.CheckLoggedIn());
    }
    this.store.select(authSelector).subscribe((userDetails: IAuthInfo) => {
      if (userDetails) {
        this.message = userDetails.message;
        this.error = userDetails.isError;
      }
    });
  }

  facebook() {
    this.store.dispatch(new FbAuth.LoginRequest());
  }

  google() {
    console.log('google');
    this.store.dispatch(new GAuth.LoginRequest());
  }

  signOutfacebook() {
    this.authenticationService.signOutFb();
  }

  authenticate(userDetails) {
    console.log('auth');

    this.showSignUp ? this.signup(userDetails) : this.login(userDetails);
  }

  login(userDetails) {
    if (userDetails.value.email && userDetails.value.password) {
      this.store.dispatch(new DefaultAuth.LoginRequest(userDetails.value));
    } else {
      this.message = 'Enter the credentials';
      this.error = true;
    }
  }

  signup(userDetails) {
    if (userDetails.value.email && userDetails.value.password) {
      this.authenticationService
        .register(userDetails.value)
        .pipe(
          catchError((error) => {
            this.error = true;
            this.message = error.error.message;
            return throwError(error);
          })
        )
        .subscribe((response) => {
          this.error = false;
          this.message = response.message;
        });
    } else {
      this.message = 'Enter all the fields';
      this.error = true;
    }
  }

  loginRegisterToggle() {
    this.showSignUp = !this.showSignUp;
    this.error = false;
    this.message = '';
  }

  updatePw(userDetails) {
    // /updatePassword
    console.log(userDetails);

    if (userDetails.value.email && userDetails.value.newpassword) {
      this.authenticationService
        .updatePassword(userDetails.value)
        .pipe(
          catchError((error) => {
            this.error = true;
            this.message = error.error.message;
            return throwError(error);
          })
        )
        .subscribe((response) => {
          this.error = false;
          this.message = response.message;
        });
    } else {
      this.message = 'Enter all the fields';
      this.error = true;
    }
  }
}
