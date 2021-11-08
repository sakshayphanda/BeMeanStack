import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PostRoutes } from 'src/app/shared/models/enums/routes.enum';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import * as fromPostsActions from '../../actions/posts/posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions<fromPostsActions.RequestTypes>,
    private http: HttpService
  ) {}

  @Effect()
  listPosts$ = this.actions$.pipe(
    ofType(fromPostsActions.LIST_ALL_POSTS),
    switchMap((userDetail) => {
      return this.http
        .post(environment.baseApiUrl + PostRoutes.GET_POSTS, userDetail.payload)
        .pipe(map((data) => new fromPostsActions.PostSuccess(data)));
    })
  );

  @Effect()
  createPost$ = this.actions$.pipe(
    ofType(fromPostsActions.CREATE_POSTS),
    switchMap((data) => {
      return this.http
        .post(environment.baseApiUrl + PostRoutes.CREATE, data.payload)
        .pipe(
          map((response) => {
            // if (response.type === HttpEventType.DownloadProgress) {
            //   console.log("download progress", response.loaded, response.total);
            // }
            // if (response.type === HttpEventType.Response) {
            //   console.log("donwload completed");
            // }
            return new fromPostsActions.PostSuccess(response);
          })
        );
    })
  );

  @Effect()
  deletePost$ = this.actions$.pipe(
    ofType(fromPostsActions.DELETE_POST),
    switchMap((data) => {
      return this.http
        .post(environment.baseApiUrl + PostRoutes.DELETE, data.payload)
        .pipe(
          map((response) => {
            return new fromPostsActions.DeleteSuccess(data.payload.index);
          })
        );
    })
  );
}
