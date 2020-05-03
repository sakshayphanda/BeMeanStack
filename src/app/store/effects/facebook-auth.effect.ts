import { ofType, Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import * as FBAuth from '../actions/auth.actions';
import { throwError, from } from 'rxjs';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Injectable()
export class SocialAuthEffects {
  constructor(private actions$: Actions<FBAuth.AuthTypes>) {}

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
          const userInfo: IUserInfo = {
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
