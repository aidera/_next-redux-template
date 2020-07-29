import { put, call, takeEvery, all } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import authApi from "../../api/auth.api";
import {
  login,
  setError,
  setIsAuth,
  setIsLoading,
  RegisterReturnType,
  LoginReturnType,
} from "./auth.actions";
import { CHECK_AUTH, LOGIN, LOGOUT, REGISTER } from "./auth.types";

const storageName = "userData";

export function* loginWorker({ payload }: LoginReturnType): SagaIterator {
  yield put(setIsLoading(true));
  try {
    const response = yield call(authApi.login, payload.email, payload.password);
    if (response.status === 200) {
      localStorage.setItem(
        storageName,
        JSON.stringify({ userId: response.userId, token: response.token })
      );
      yield put(setIsAuth(true));
    } else {
      yield put(setError(response.message));
      yield put(setIsAuth(false));
    }
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(setError(e));
  }
}

export function* registerWorker({ payload }: RegisterReturnType): SagaIterator {
  try {
    yield put(setIsLoading(true));
    const response = yield call(
      authApi.register,
      payload.name,
      payload.email,
      payload.password
    );
    if (response.status === 200) {
      yield put(
        login({
          email: payload.email,
          password: payload.password,
        })
      );
    } else {
      yield put(setError(response.message));
      yield put(setIsAuth(false));
    }
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(setError(e));
  }
}

export function* logoutWorker(): SagaIterator {
  localStorage.removeItem(storageName);
  yield put(setIsAuth(false));
}

export function* checkAuthWorker(): SagaIterator {
  const userData = localStorage.getItem(storageName);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    if (userDataObj && userDataObj.token) {
      yield put(setIsAuth(true));
    } else {
      yield put(setIsAuth(false));
    }
  } else {
    yield put(setIsAuth(false));
  }
}

export default function* authSaga(): SagaIterator {
  yield all([
    takeEvery(LOGIN, loginWorker),
    takeEvery(REGISTER, registerWorker),
    takeEvery(LOGOUT, logoutWorker),
    takeEvery(CHECK_AUTH, checkAuthWorker),
  ]);
}
