import { Action } from '@ngrx/store';
export const LIST_ALL_POSTS = '[Posts] | LIST_ALL_POSTS';
export const CREATE_POSTS = '[Posts] | CREATE_POSTS';
export const CREATE_POSTS_SUCCESS = '[Posts] | CREATE_POSTS_SUCCESS';
export const DELETE_POST = '[posts] DELETE_POST';
export const DELETE_SUCCESS = '[Posts] | DELETE_SUCCESS';

export class ListAllPostsApi implements Action {
  readonly type = LIST_ALL_POSTS;
  constructor(public payload) {}
}

export class CreatePostApi implements Action {
  readonly type = CREATE_POSTS;
  constructor(public payload) {}
}


export class DeletePostApi implements Action {
  readonly type = DELETE_POST;
  constructor(public payload) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload) {}
}

export class PostSuccess implements Action {
  readonly type = CREATE_POSTS_SUCCESS;
  constructor(public payload) {}
}


export type SuccessTypes = PostSuccess | DeleteSuccess;
export type RequestTypes = ListAllPostsApi| CreatePostApi | DeletePostApi;
