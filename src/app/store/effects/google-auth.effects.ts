import { ofType, Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import * as GAuth from '../actions/auth.actions';
import { throwError, from } from 'rxjs';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Injectable()
export class SocialAuthEffects {
  constructor(private actions$: Actions<GAuth.AuthTypes>) {}

  @Effect()
  gmailLogin$ = this.actions$.pipe(
    ofType(GAuth.LOGIN_REQUEST),
    switchMap(() => {
      return from(
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      ).pipe(
        map((data) => {
          const obj = {
            token: data.credential[`accessToken`],
            displayName: data.user.displayName,
            email: data.user.email,
            userImage: data.user.photoURL,
          };
          return new GAuth.LoginSuccess(obj);
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
    ofType(GAuth.CHECK_LOGGED_IN),
    switchMap(() => {
      return from(this.authState()).pipe(
        map((user) => {
          const userInfo: IUserInfo = {
            token: user.id,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          return new GAuth.LoginSuccess(userInfo);
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
