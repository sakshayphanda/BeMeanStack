import {Injectable } from '@angular/core';
import { Effect , Actions, ofType} from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { authTypes, LoggedIn, Auth } from '../actions/auth.actions';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { Authenticate } from 'src/app/shared/models/enums/authentication.enum';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import * as firebase from 'firebase';


@Injectable()
export class LoginEffects {
  provider = new firebase.auth.FacebookAuthProvider();
  constructor(
    private actions$: Actions<Auth>,
    private http: HttpService,
    private authService: AuthenticationService
    ) { }

  @Effect()
  defaultLogin$ = this.actions$.pipe(ofType(authTypes.DEFAULT_LOGIN),
  switchMap(
    userDetail => {
\      return this.http.httpPost(environment.baseApiUrl + Authenticate.LOG_IN, userDetail.payload).pipe(
        map(
          data => {
            return new LoggedIn(data);
          }
        )
      );
    }
  ));

  // @Effect()
  // facebookLogin$ = this.actions$.pipe(ofType(authTypes.FACEBOOK_LOGIN),
  // map(
  //   async () => {
  //     const resp = await firebase.auth().signInWithPopup(this.provider);
  //     console.log(resp);

  //     return new LoggedIn(resp);
  //   }
  // ));
}
