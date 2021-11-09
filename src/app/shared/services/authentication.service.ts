import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRoutes } from '../models/enums/routes.enum';
import {
  IAuthenticate,
  IUserInfo,
} from '../models/interfaces/authenticate.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn = false;
  userDetails: IUserInfo;
  provider = new firebase.auth.FacebookAuthProvider();
  constructor(private httpService: HttpService) {}

  fbSignInRedirect() {
    firebase.auth().signInWithRedirect(this.provider);
  }

  authToken() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    });
  }

  signOutFb() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  loginGoogle() {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  athenticate(loginDetails: IAuthenticate): Observable<any> {
    return this.httpService.post(
      environment.baseApiUrl + AuthRoutes.LOG_IN,
      loginDetails
    );
  }

  register(signinDetails): Observable<any> {
    return this.httpService.post(
      environment.baseApiUrl + AuthRoutes.SIGN_UP,
      signinDetails
    );
  }

  getUserDetails(email): Observable<any> {
    return this.httpService.post(environment.baseApiUrl + AuthRoutes.GET_USER, {
      email,
    });
  }

  updatePassword(user): Observable<any> {
    return this.httpService.post(
      environment.baseApiUrl + AuthRoutes.UPDATE_PASSWORD,
      user
    );
  }
}
