import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user-reducer";
import thunk from "redux-thunk";
import {placeReducer} from "./reducers/place-reducer";

const rootReducer = combineReducers({
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