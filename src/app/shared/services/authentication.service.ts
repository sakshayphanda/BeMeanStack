import { Injectable } from '@angular/core';
import { IAuthenticate } from '../models/interfaces/authenticate.interface';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { AuthRoutes } from '../models/enums/routes.enum';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  provider = new firebase.auth.FacebookAuthProvider();
  constructor(
    private httpService: HttpService
  ) {
  }

  fbSignInRedirect() {
    firebase.auth().signInWithRedirect(this.provider);
  }

  authToken() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);

    });
  }

  signOutFb() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  loginGoogle() {
    firebase.auth().signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  athenticate(loginDetails: IAuthenticate): Observable<any> {
    return this.httpService.post(environment.baseApiUrl + AuthRoutes.LOG_IN, loginDetails);
  }

  register(signinDetails: IAuthenticate): Observable<any> {
    return this.httpService.post(environment.baseApiUrl + AuthRoutes.SIGN_UP, signinDetails);
  }
}
