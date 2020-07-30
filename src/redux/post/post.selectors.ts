import { AppStateType } from "../root.reducer";
import { IPost } from "../../types/Post";

export const getPosts = (state: AppStateType): IPost[] => {
  return state.post.posts;
};

export const getCurrentPost = (state: AppStateType): IPost => {
  return state.post.currentPost;
};
