import { Action } from '@ngrx/store';
export const LIST_ALL_POSTS: string = '[Posts] | LIST_ALL_POSTS';
export const CREATE_POSTS: string = '[Posts] | CREATE_POSTS';
export const CREATE_POSTS_SUCCESS: string = '[Posts] | CREATE_POSTS_SUCCESS';
export const DELETE_POST: string = '[posts] DELETE_POST';
export const DELETE_SUCCESS: string = '[Posts] | DELETE_SUCCESS';

export class ListAllPostsApi implements Action {
  readonly type: string = LIST_ALL_POSTS;
  constructor(public payload: any) {}
}

// export const ListAllPostsApi = createAction(
//   LIST_ALL_POSTS,
//   props<{ payload: any }>()
// );

export class CreatePostApi implements Action {
  readonly type: string = CREATE_POSTS;
  constructor(public payload: any) {}
}

export class DeletePostApi implements Action {
  readonly type: string = DELETE_POST;
  constructor(public payload: any) {}
}

export class DeleteSuccess implements Action {
  readonly type: string = DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class PostSuccess implements Action {
  readonly type: string = CREATE_POSTS_SUCCESS;
  constructor(public payload: any) {}
}

export type SuccessTypes = PostSuccess | DeleteSuccess;
export type RequestTypes = ListAllPostsApi | CreatePostApi | DeletePostApi;
