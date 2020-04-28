import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DefaultLogin, FacebookLogIn } from 'src/app/store/actions/auth.actions';
import { authSelector } from 'src/app/store/reducers';

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
    this.authenticationService.authToken();
    this.store.select(authSelector).subscribe(
      userDetails => {
        console.log(userDetails);
      }
    );
  }

  facebook() {
    // this.store.dispatch(new FacebookLogIn());
   this.authenticationService.fbSignInWithPopup();
  }

  google() {
    this.authenticationService.loginGoogle();
  }

  signOutfacebook() {
    this.authenticationService.signOutFb();
  }

  authenticate(userDetails) {
    this.showSignUp ? this.signup(userDetails) : this.login(userDetails);
  }

  login(userDetails) {
    this.store.dispatch(new DefaultLogin(userDetails.value));
    // this.authenticationService
    //   .athenticate(userDetails.value)
    //   .pipe(
    //     catchError((error) => {
    //       this.message = error.error.message;
    //       this.error = true;
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe((response) => {
    //     this.error = false;
    //     localStorage.setItem('token', response.token);
    //     this.message = response.message;
    //   });
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
}
