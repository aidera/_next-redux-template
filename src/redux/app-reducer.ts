export const appActionTypes = {
    SET_INITIAL_SUCCESS: 'app/SET_INITIAL_SUCCESS',
    SET_GLOBAL_ERROR_SUCCESS: 'app/SET_GLOBAL_ERROR_SUCCESS'
}



let initialState = {
    initialized: false,
    globalError: null as string | null
}
export type InitialStateType = typeof initialState



const appReducer = (state = initialState, action): InitialStateType => {

    switch (action.type) {

        case appActionTypes.SET_INITIAL_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        case appActionTypes.SET_GLOBAL_ERROR_SUCCESS:
            return {
                ...state,
                globalError: action.error
            };

        default:
            return state;

    }
}



export default appReducer