import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import * as GAuth from '../../actions/authentication/google-auth.actions';

@Injectable()
export class GoogleAuthEffects {
  @Effect()
  gmailLogin$: Observable<any> = this.actions$.pipe(
    ofType(GAuth.LOGIN_REQUEST),
    switchMap(() => {
      return from(
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      ).pipe(
        concatMap((data) => {
          const obj = {
            user: {
              token: data.user.refreshToken,
              displayName: data.user.displayName,
              email: data.user.email,
              photoUrl: data.user.photoURL,
            },
          };
          localStorage.setItem('token', obj.user.token);
          localStorage.setItem('email', obj?.user?.email);
          localStorage.setItem('authType', 'googleAuth');

          const payload = {
            email: data.user.email,
            firstName: data.user.displayName.split(' ')[0],
            lastName: data.user.displayName.split(' ')[1] || '',
            authType: 'googleAuth',
            password: '',
            photoUrl: data.user.photoURL,
          };
          return this.authenticationService.register(payload);
        }),
        map((obj) => {
          return new GAuth.LoginSuccess(obj);
        }),
        catchError((error) => {
          throw throwError(error.code);
        })
      );
    })
  );

  @Effect()
  checkLoggedIn$: Observable<any> = this.actions$.pipe(
    ofType(GAuth.CHECK_LOGGED_IN),
    switchMap((data) => {
      return from(this.firebaseAuthState()).pipe(
        concatMap((user) => {
          if (data.payload === user.refreshToken) {
            return this.authenticationService.getUserDetails(user.email);
          }
          return new BehaviorSubject(null);
        }),
        map((user) => {
          if (user) {
            return new GAuth.LoginSuccess(user);
          }
          return new GAuth.LoginFailed(user);
        }),
        catchError((error) => {
          throw throwError(error);
        })
      );
    })
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(GAuth.LOGOUT_REQUEST),
    switchMap(() => {
      return from(firebase.auth().signOut()).pipe(
        map(() => {
          return new GAuth.LogoutSuccess();
        }),
        catchError((error) => {
          throw throwError(error);
        })
      );
    })
  );

  constructor(
    private actions$: Actions<GAuth.AuthTypes>,
    private authenticationService: AuthenticationService
  ) {}

  async firebaseAuthState(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((userID) => {
            const obj = Object.assign({ id: userID }, user);
            resolve(obj);
          });
        } else {
          reject();
        }
      });
    });
  }
}
