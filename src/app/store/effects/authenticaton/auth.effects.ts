import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'firebase/auth';
import 'firebase/firestore';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthRoutes } from 'src/app/shared/models/enums/routes.enum';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import * as DefaultAuth from '../../actions/authentication/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<DefaultAuth.AuthTypes>,
    private http: HttpService,
    private router: Router
  ) {}

  @Effect()
  checkLoggedIn$ = this.actions$.pipe(
    ofType(DefaultAuth.CHECK_LOGGED_IN),
    switchMap((userDetail) => {
      return this.http
        .post(environment.baseApiUrl + AuthRoutes.CHECK_AUTH, {
          email: localStorage.getItem('email'),
        })
        .pipe(
          map((data) => {
            console.log(data);
            return new DefaultAuth.LoginSuccess(data);
          })
        );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(DefaultAuth.LOGIN_REQUEST),
    switchMap((userDetail) => {
      if (userDetail?.payload) {
        localStorage.setItem('email', userDetail?.payload?.email);
      }
      return this.http
        .post(environment.baseApiUrl + AuthRoutes.LOG_IN, userDetail.payload)
        .pipe(
          map((data) => {
            localStorage.setItem('token', data.user.token);
            return new DefaultAuth.LoginSuccess(data);
          }),
          catchError((error) =>
            of(new DefaultAuth.LoginFailed(error.error.message))
          )
        );
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(DefaultAuth.LOGOUT_REQUEST),
    switchMap((userDetail) => {
      this.router.navigate(['']);
      return this.http.get(environment.baseApiUrl + AuthRoutes.LOG_OUT).pipe(
        map((data) => {
          localStorage.clear();
          return new DefaultAuth.LogoutSuccess();
        })
      );
    })
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(DefaultAuth.UPDATE_USER_API),
    switchMap((userDetail) => {
      return this.http
        .post(
          environment.baseApiUrl + AuthRoutes.UPDATE_USER,
          userDetail.payload
        )
        .pipe(
          map((data) => {
            return new DefaultAuth.UpdateUser(data);
          })
        );
    })
  );
}
