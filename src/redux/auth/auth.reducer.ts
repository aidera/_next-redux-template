import { AuthActionsReturnTypes } from "./auth.actions";
import { SET_ERROR, SET_IS_AUTH, SET_IS_LOADING } from "./auth.types";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null as string | null,
};
export type AuthInitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionsReturnTypes
): AuthInitialStateType => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
