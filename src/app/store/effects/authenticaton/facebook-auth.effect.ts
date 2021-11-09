import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FBAuth from '../../actions/authentication/auth.actions';

@Injectable()
export class FacebookAuthEffects {
  @Effect()
  facebookLogin$ = this.actions$.pipe(
    ofType(FBAuth.LOGIN_REQUEST),
    switchMap(() => {
      return from(
        firebase
          .auth()
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      ).pipe(
        map((data) => {
          const obj = {
            token: data.credential[`accessToken`],
            displayName: data.user.displayName,
            email: data.user.email,
            userImage: data.user.photoURL,
          };
          return new FBAuth.LoginSuccess(obj);
        }),
        catchError((error) => {
          const errorCode = error.code;
          throw throwError(errorCode);
        })
      );
    })
  );

  @Effect()
  checkLoggedIn$ = this.actions$.pipe(
    ofType(FBAuth.CHECK_LOGGED_IN),
    switchMap(() => {
      return from(this.authState()).pipe(
        map((user) => {
          const userInfo = {
            token: user.id,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          return new FBAuth.LoginSuccess(userInfo);
        }),
        catchError((error) => {
          throw throwError(error);
        })
      );
    })
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(FBAuth.LOGOUT_REQUEST),
    switchMap(() => {
      return from(firebase.auth().signOut()).pipe(
        map(() => {
          return new FBAuth.LogoutSuccess();
        }),
        catchError((error) => {
          throw throwError(error);
        })
      );
    })
  );

  constructor(private actions$: Actions<FBAuth.AuthTypes>) {}

  /**
   * auth state
   */
  async authState(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
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

    return promise;
  }
}
