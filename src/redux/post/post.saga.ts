import { put, call, takeEvery, all } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { LoadPostReturnType, setCurrentPost, setPosts } from "./post.actions";
import { LOAD_POSTS, LOAD_POST } from "./post.types";
import postsApi from "../../api/posts.api";

export function* loadPostsWorker(): SagaIterator {
  try {
    const response = yield call(postsApi.getPosts);
    yield put(setPosts(response));
  } catch (e) {
    yield put(setPosts([]));
  }
}

export function* loadPostWorker({ payload }: LoadPostReturnType): SagaIterator {
  try {
    const response = yield call(postsApi.getPost, payload);
    yield put(setCurrentPost(response));
  } catch (e) {
    yield put(setCurrentPost(null));
  }
}

export default function* postSaga(): SagaIterator {
  yield all([
    takeEvery(LOAD_POSTS, loadPostsWorker),
    takeEvery(LOAD_POST, loadPostWorker),
  ]);
}
