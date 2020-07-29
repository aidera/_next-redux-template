import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga";
import rootReducer from "./root.reducer";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: Array<any>) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  const storeToInit = createStore(reducer, bindMiddleware([sagaMiddleware]));
  sagaMiddleware.run(rootSaga);
  return storeToInit;
};

export const wrapper = createWrapper(initStore);
