import {combineReducers, createStore, applyMiddleware, Action} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import appReducer from './app-reducer'



const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}



const rootReducer = combineReducers({
    app: appReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<AT extends Action, R = void> = ThunkAction<Promise<R>, AppStateType, unknown, AT>



const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}



const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
