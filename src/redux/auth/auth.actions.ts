import {
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_ERROR,
  SET_IS_AUTH,
  SET_IS_LOADING,
  CHECK_AUTH,
} from "./auth.types";

export const setIsAuth = (payload: boolean) =>
  ({
    type: SET_IS_AUTH,
    payload,
  } as const);
export type SetIsAuthReturnType = ReturnType<typeof setIsAuth>;

export const setIsLoading = (payload: boolean) =>
  ({
    type: SET_IS_LOADING,
    payload,
  } as const);
export type SetIsLoadingReturnType = ReturnType<typeof setIsLoading>;

export const setError = (payload: string | null) =>
  ({
    type: SET_ERROR,
    payload,
  } as const);
export type SetErrorReturnType = ReturnType<typeof setError>;

export const login = (payload: { email: string; password: string }) =>
  ({
    type: LOGIN,
    payload,
  } as const);
export type LoginReturnType = ReturnType<typeof login>;

export const register = (payload: {
  name: string;
  email: string;
  password: string;
}) =>
  ({
    type: REGISTER,
    payload,
  } as const);
export type RegisterReturnType = ReturnType<typeof register>;

export const logout = () =>
  ({
    type: LOGOUT,
  } as const);
export type LogoutReturnType = ReturnType<typeof logout>;

export const checkAuth = () =>
  ({
    type: CHECK_AUTH,
  } as const);
export type CheckAuthReturnType = ReturnType<typeof checkAuth>;

export type AuthActionsReturnTypes =
  | SetIsAuthReturnType
  | SetIsLoadingReturnType
  | SetErrorReturnType
  | LoginReturnType
  | RegisterReturnType
  | LogoutReturnType
  | CheckAuthReturnType;
