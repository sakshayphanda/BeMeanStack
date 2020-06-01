import {Injectable } from '@angular/core';
import { Effect , Actions, ofType} from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as DefaultAuth from '../../actions/authentication/auth.actions';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthRoutes } from 'src/app/shared/models/enums/routes.enum';
import 'firebase/auth';
import 'firebase/firestore';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<DefaultAuth.AuthTypes>,
    private http: HttpService,
    private router: Router
    ) { }

  @Effect()
  checkLoggedIn$ = this.actions$.pipe(ofType(DefaultAuth.CHECK_LOGGED_IN),
  switchMap(
    userDetail => {
      return this.http.post(environment.baseApiUrl + AuthRoutes.CHECK_AUTH, {
        email: localStorage.getItem('email')
      }).pipe(
        map(
          data => {
            console.log(data);
            return new DefaultAuth.LoginSuccess(data);
          }
        )
      );
    }
  ));

  @Effect()
  login$ = this.actions$.pipe(ofType(DefaultAuth.LOGIN_REQUEST),
  switchMap(
    userDetail => {
      localStorage.setItem('email', userDetail.payload.email);
      return this.http.post(environment.baseApiUrl + AuthRoutes.LOG_IN, userDetail.payload).pipe(
        map(
          data => {
            localStorage.setItem('token', data.user.token);
            return new DefaultAuth.LoginSuccess(data);
          }
        ),
        catchError((error) => of(new DefaultAuth.LoginFailed(error.error.message)))
      );
    }
  ));


  @Effect()
  logout$ = this.actions$.pipe(ofType(DefaultAuth.LOGOUT_REQUEST),
  switchMap(
    userDetail => {
      this.router.navigate(['']);
      return this.http.get(environment.baseApiUrl + AuthRoutes.LOG_OUT).pipe(
        map(
          data => {
            localStorage.clear();
            return new DefaultAuth.LogoutSuccess();
          }
        )
      );
    }
  ));
}
