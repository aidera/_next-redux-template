import { put, takeEvery, all } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { setInitial } from "./app.actions";
import { INITIALIZE } from "./app.types";

export function* initializeWorker(): SagaIterator {
  yield put(setInitial());
}

export default function* appSaga(): SagaIterator {
  yield all([takeEvery(INITIALIZE, initializeWorker)]);
}
