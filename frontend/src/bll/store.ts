import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user-reducer";
import {placeReducer} from "./reducers/place-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {appReducer} from "./reducers/app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    place: placeReducer,
})

let preloadedState = {
    auth: {
        loggedInUserToken: JSON.parse(localStorage.getItem('token') as string),
        loggedInUserId: JSON.parse(localStorage.getItem('user-id') as string)
    }
}


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState
})

store.subscribe(() => {
    localStorage.setItem('token', JSON.stringify(store.getState().auth.loggedInUserToken))
    localStorage.setItem('user-id', JSON.stringify(store.getState().auth.loggedInUserId))
})

// Types
export type AppRootStateT = ReturnType<typeof rootReducer>
export type AppDispatchT = typeof store.dispatch