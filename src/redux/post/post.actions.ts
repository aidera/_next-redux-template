import { ADD_POST, DELETE_POST, LOAD_POSTS, SET_POSTS } from "./post.types";
import { IPost } from "../../types/Post";

export const addPost = (payload: IPost) =>
  ({
    type: ADD_POST,
    payload,
  } as const);
export type AddPostTypeReturnType = ReturnType<typeof addPost>;

export const deletePost = (payload: number) =>
  ({
    type: DELETE_POST,
    payload,
  } as const);
export type DeletePostReturnType = ReturnType<typeof deletePost>;

export const loadPosts = () =>
  ({
    type: LOAD_POSTS,
  } as const);
export type LoadPostsReturnType = ReturnType<typeof loadPosts>;

export const loadPost = (payload: number) =>
  ({
    type: LOAD_POSTS,
    payload,
  } as const);
export type LoadPostReturnType = ReturnType<typeof loadPost>;

export const setPosts = (payload: IPost[]) =>
  ({
    type: SET_POSTS,
    payload,
  } as const);
export type SetPostsReturnType = ReturnType<typeof setPosts>;

export type PostActionsReturnTypes =
  | AddPostTypeReturnType
  | DeletePostReturnType
  | LoadPostsReturnType
  | LoadPostReturnType
  | SetPostsReturnType;
