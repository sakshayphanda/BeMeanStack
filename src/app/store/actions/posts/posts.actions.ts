import { Action } from '@ngrx/store';
export const LIST_ALL_POSTS = '[Posts] | List all Posts';
export const CREATE_POSTS = '[Posts] | Create Posts';
export const CREATE_POSTS_SUCCESS = '[Posts] | Success';

export class ListAllPostsApi implements Action {
  readonly type = LIST_ALL_POSTS;
  constructor() {}
}


export class CreatePostApi implements Action {
  readonly type = CREATE_POSTS;
  constructor(public payload) {}
}

export class PostSuccess implements Action {
  readonly type = CREATE_POSTS_SUCCESS;
  constructor(public payload) {}
}


export type SuccessTypes = PostSuccess;
export type RequestTypes = ListAllPostsApi| CreatePostApi;
