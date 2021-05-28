import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {usersReducer} from '../../feature/user/redux/users-reducer'
import {petReducer} from '../../feature/pets/redux/pet-reducer'
import {authReducer} from '../../feature/auth/redux/auth-reducer'
import {appReducer} from './app-reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
    // pet: petReducer,
})

let preloadedState = {
    auth: {
        token: JSON.parse(localStorage.getItem('token') as string),
        tokenExpiration: JSON.parse(localStorage.getItem('token-expiration') as string),
        loggedInUserId: JSON.parse(localStorage.getItem('user-id') as string)
    }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, preloadedState as AppRootStateT, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    localStorage.setItem('token', JSON.stringify(store.getState().auth.token))
    localStorage.setItem('token-expiration', JSON.stringify(store.getState().auth.tokenExpiration))
    localStorage.setItem('user-id', JSON.stringify(store.getState().auth.loggedInUserId))
})

// Types
export type AppRootStateT = ReturnType<typeof rootReducer>