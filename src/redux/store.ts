import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga";
import rootReducer from "./root.reducer";

const bindMiddleware = (middleware: Array<any>) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]));
  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(initStore);
