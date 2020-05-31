import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FbAuth, GAuth, DefaultAuth } from '../../../store/actions';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { authSelector } from 'src/app/store/selectors/auth.selector';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit{
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
    this.store.select(authSelector).subscribe(
      (userDetails: IAuthInfo) => {
        if (userDetails) {
          this.message = userDetails.message;
          this.error = userDetails.isError;
        }
      }
    );
  }
  login(userDetails) {
    this.store.dispatch(new DefaultAuth.LoginRequest(userDetails.value));
  }

  facebook() {
   this.store.dispatch(new FbAuth.LoginRequest());
  }

  google() {
    this.store.dispatch(new GAuth.LoginRequest());
  }

  signOutfacebook() {
    this.authenticationService.signOutFb();
  }

  authenticate(userDetails) {
    this.showSignUp ? this.signup(userDetails) : this.login(userDetails);
  }

  signup(userDetails) {
    this.showSignUp = true;
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
  }

  loginRegisterToggle() {
    this.showSignUp = !this.showSignUp;
    this.error = false;
    this.message = '';
  }
}
