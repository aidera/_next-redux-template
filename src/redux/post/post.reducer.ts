import { PostActionsReturnTypes } from "./post.actions";
import {
  ADD_POST,
  DELETE_POST,
  SET_CURRENT_POST,
  SET_POSTS,
} from "./post.types";
import { IPost } from "../../types/Post";

const initialState = {
  posts: [] as IPost[],
  currentPost: null as IPost | null,
  isFetching: false,
};
export type PostInitialStateType = typeof initialState;

const postReducer = (
  state = initialState,
  action: PostActionsReturnTypes
): PostInitialStateType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((el) => el.id !== action.payload),
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
