import { all } from "redux-saga/effects";
import appSaga from "./app/app.saga";
import postSaga from "./post/post.saga";
import authSaga from "./auth/auth.saga";

export default function* rootSaga(): Generator {
  yield all([appSaga(), postSaga(), authSaga()]);
}
