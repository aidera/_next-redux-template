import { AppStateType } from "../root.reducer";

export const getIsAuth = (state: AppStateType): boolean => {
  return state.auth.isAuth;
};

export const getIsLoading = (state: AppStateType): boolean => {
  return state.auth.isLoading;
};

export const getError = (state: AppStateType): null | string => {
  return state.auth.error;
};
