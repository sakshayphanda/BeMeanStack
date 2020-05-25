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
    private actions$: Actions<fromUsersActions.RequestTypes>,
    private http: HttpService
    ) { }

  @Effect()
  listUsers$ = this.actions$.pipe(ofType(fromUsersActions.ListUsersRequest),
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

  @Effect()
  addAsFriend$ = this.actions$.pipe(ofType(fromUsersActions.FRIEND_REQUEST),
  switchMap(
    data => {
      return this.http.post(environment.baseApiUrl + UserRoutes.FRIEND_REQUEST, data.payload).pipe(
        map(
          response => {
            return new fromUsersActions.FriendRequestSuccess(response);
          }
        )
      );
    }
  ));

  @Effect()
  acceptFriend$ = this.actions$.pipe(ofType(fromUsersActions.FRIEND_REQUEST_ACCEPT),
  switchMap(
    data => {
      return this.http.post(environment.baseApiUrl + UserRoutes.FRIEND_REQUEST_ACCEPTED, data.payload).pipe(
        map(
          response => {
            return new fromUsersActions.FriendRequestSuccess(response);
          }
        )
      );
    }
  ));

  @Effect()
  rejectFriend$ = this.actions$.pipe(ofType(fromUsersActions.FRIEND_REQUEST_REJECT),
  switchMap(
    data => {
      return this.http.post(environment.baseApiUrl + UserRoutes.FRIEND_REQUEST_REJECTED, data.payload).pipe(
        map(
          response => {
            return new fromUsersActions.FriendRequestSuccess(response);
          }
        )
      );
    }
  ));

  @Effect()
  unfriend$ = this.actions$.pipe(ofType(fromUsersActions.UNFRIEND),
  switchMap(
    data => {
      return this.http.post(environment.baseApiUrl + UserRoutes.UNFRIEND, data.payload).pipe(
        map(
          response => {
            return new fromUsersActions.FriendRequestSuccess(response);
          }
        )
      );
    }
  ));
}
