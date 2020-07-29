import { AppActionsReturnTypes } from "./app.actions";
import { SET_INITIAL, SET_IS_NAVBAR_OPEN } from "./app.types";

const initialState = {
  initialized: false,
  globalError: null as string | null,
  isNavbarOpen: false,
};
export type AppInitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: AppActionsReturnTypes
): AppInitialStateType => {
  switch (action.type) {
    case SET_INITIAL:
      return {
        ...state,
        initialized: true,
      };

    case SET_IS_NAVBAR_OPEN:
      return {
        ...state,
        isNavbarOpen: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
