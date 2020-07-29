import { INITIALIZE, SET_INITIAL, SET_IS_NAVBAR_OPEN } from "./app.types";

export const setInitial = () => ({ type: SET_INITIAL } as const);
export type SetInitialReturnType = ReturnType<typeof setInitial>;

export const initializeApp = () =>
  ({
    type: INITIALIZE,
  } as const);
export type InitializeAppReturnType = ReturnType<typeof initializeApp>;

export const setIsNavbarOpen = (payload: boolean) =>
  ({
    type: SET_IS_NAVBAR_OPEN,
    payload,
  } as const);
export type SetIsNavbarOpenReturnType = ReturnType<typeof setIsNavbarOpen>;

export type AppActionsReturnTypes =
  | SetInitialReturnType
  | InitializeAppReturnType
  | SetIsNavbarOpenReturnType;
