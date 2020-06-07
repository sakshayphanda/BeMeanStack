import {Injectable } from '@angular/core';
import { Effect , Actions, ofType} from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as fromPostsActions from '../../actions/posts/posts.actions';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { UserRoutes, PostRoutes } from 'src/app/shared/models/enums/routes.enum';


@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions<fromPostsActions.RequestTypes>,
    private http: HttpService
    ) { }

  @Effect()
  listPosts$ = this.actions$.pipe(ofType(fromPostsActions.LIST_ALL_POSTS),
  switchMap(
    userDetail => {
      return this.http.post(environment.baseApiUrl + PostRoutes.GET_POSTS, userDetail.payload).pipe(
        map(
          data => {
            return new fromPostsActions.PostSuccess(data);
          }
        )
      );
    }
  ));

  @Effect()
  createPost$ = this.actions$.pipe(ofType(fromPostsActions.CREATE_POSTS),
  switchMap(
    data => {
      return this.http.post(environment.baseApiUrl + PostRoutes.CREATE, data.payload).pipe(
        map(
          response => {
            return new fromPostsActions.PostSuccess(response);
          }
        )
      );
    }
  ));
}
