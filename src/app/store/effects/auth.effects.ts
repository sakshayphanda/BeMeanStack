import {Injectable } from '@angular/core';
import { Effect , Actions, ofType} from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { authTypes, LoggedIn, Auth, LogoutSuccess } from '../actions/auth.actions';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { Authenticate } from 'src/app/shared/models/enums/authentication.enum';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import * as firebase from 'firebase';
import { from, throwError } from 'rxjs';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions<Auth>,
    private http: HttpService,
    private authService: AuthenticationService
    ) { }

  @Effect()
  defaultLogin$ = this.actions$.pipe(ofType(authTypes.DEFAULT_LOGIN),
  switchMap(
    userDetail => {
      return this.http.httpPost(environment.baseApiUrl + Authenticate.LOG_IN, userDetail.payload).pipe(
        map(
          data => {
            console.log(data);
            return new LoggedIn(data);
          }
        )
      );
    }
  ));

  @Effect()
  facebookLogin$ = this.actions$.pipe(ofType(authTypes.FACEBOOK_LOGIN),
  switchMap(
    userDetail => {
      return from(firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())).pipe(
        map(
          data => {
            console.log(data);
            const obj = {
              token: data.credential[`accessToken`],
              displayName: data.user.displayName,
              email: data.user.email,
              userImage: data.user.photoURL
            };
            return new LoggedIn(obj);
          }
        ),
        catchError(
          error => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            throw throwError(errorCode);
        }
      ));
    }
  ));

  @Effect()
  gmailLogin$ = this.actions$.pipe(ofType(authTypes.GOOGLE_LOGIN),
  switchMap(
    userDetail => {
      return from(firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
        map(
          data => {
            console.log(data);
            const obj = {
              token: data.credential[`accessToken`],
              displayName: data.user.displayName,
              email: data.user.email,
              userImage: data.user.photoURL
            };
            return new LoggedIn(obj);
          }
        ),
        catchError(
          error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            throw throwError(errorCode);
        }
      ));
    }
  ));

  @Effect()
  checkLoggedIn$ = this.actions$.pipe(ofType(authTypes.CHECK_LOGGED_IN),
  switchMap(
    userDetail => {
      return from(this.authState()).pipe(
        map(
          user => {
            console.log(user);
            const obj = {
              token: user.id,
              displayName: user.displayName,
              email: user.email,
              userImage: user.photoURL
            };
            return new LoggedIn(obj);
          }
        ),
        catchError(
          error => {
            throw throwError(error);
        }
      ));
    }
  ));

  @Effect()
  signOut$ = this.actions$.pipe(ofType(authTypes.LOG_OUT_REQUEST),
  switchMap(
    userDetail => {
      return from(firebase.auth().signOut()).pipe(
        map(
          success => {
            return new LogoutSuccess();
          }
        ),
        catchError(
          error => {
            throw throwError(error);
        }
      ));
    }
  ));

  async authState(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
        user.getIdToken().then(
          userID =>{
            const obj = Object.assign({id:userID}, user);
            resolve(obj);
          }
        );
      } else {
        reject();
      }
    });

    });

    return promise;
}
}

