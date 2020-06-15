import {BaseThunkType, InferActionsTypes} from './store'
import {appActionTypes} from './app-reducer'



export const actions = {
    setInitialSuccess: () => ({ type: appActionTypes.SET_INITIAL_SUCCESS } as const),
    setGlobalErrorSuccess:  (error: string | null) => ({ type: appActionTypes.SET_GLOBAL_ERROR_SUCCESS, error: error } as const)
}
export type ActionTypes = InferActionsTypes<typeof actions>



export const initializeApp = ():BaseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.setInitialSuccess())
}

export const setGlobalError = (error: string | null):BaseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.setGlobalErrorSuccess(error))
}