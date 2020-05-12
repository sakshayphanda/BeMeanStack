import {Injectable } from '@angular/core';
import { Effect , Actions, ofType} from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromUsersActions from '../../actions/users/users.actions';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { UserRoutes } from 'src/app/shared/models/enums/routes.enum';


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions<fromUsersActions.types>,
    private http: HttpService
    ) { }

  @Effect()
  checkLoggedIn$ = this.actions$.pipe(ofType(fromUsersActions.ListUsersRequest),
  switchMap(
    userDetail => {
      return this.http.get(environment.baseApiUrl + UserRoutes.GET_ALL_USERS).pipe(
        map(
          data => {
            return new fromUsersActions.ListAllUsers(data);
          }
        )
      );
    }
  ));
}
