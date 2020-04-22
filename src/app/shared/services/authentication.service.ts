import { Injectable } from '@angular/core';
import { IAuthenticate } from '../models/interfaces/authenticate.interface';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Authenticate } from '../models/enums/authentication.enum';
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

  fbSignInWithPopup() {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential[`accessToken`];
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  fbSignInRedirect() {
    firebase.auth().signInWithRedirect(this.provider);
  }

  authToken() {
    firebase.auth().getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential[`accessToken`];
        // ...
      }
      // The signed-in user info.
      const user = result.user;
      console.log(user);

    }).catch((error) =>{
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
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
    return this.httpService.httpPost(environment.baseApiUrl + Authenticate.LOG_IN, loginDetails);
  }

  register(signinDetails: IAuthenticate): Observable<any> {
    return this.httpService.httpPost(environment.baseApiUrl + Authenticate.SIGN_IN, signinDetails);
  }
}
