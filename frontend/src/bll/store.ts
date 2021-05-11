import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user-reducer";
import thunk from "redux-thunk";
import {placeReducer} from "./reducers/place-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {appReducer} from "./reducers/app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    place: placeReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// Types
export type AppRootStateT = ReturnType<typeof rootReducer>
export type AppDispatchT = typeof store.dispatch