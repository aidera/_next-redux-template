import { combineReducers } from "redux";
import appReducer from "./app/app.reducer";
import authReducer from "./auth/auth.reducer";
import postReducer from "./post/post.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  post: postReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;
