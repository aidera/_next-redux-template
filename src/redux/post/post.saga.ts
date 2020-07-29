import { put, call, takeEvery, all } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { setPosts } from "./post.actions";
import { LOAD_POSTS } from "./post.types";
import postsApi from "../../api/posts.api";

export function* loadPostsWorker(): SagaIterator {
  try {
    const response = yield call(postsApi.getPosts);
    yield put(setPosts(response));
  } catch (e) {
    yield put(setPosts([]));
  }
}

export default function* postSaga(): SagaIterator {
  yield all([takeEvery(LOAD_POSTS, loadPostsWorker)]);
}
