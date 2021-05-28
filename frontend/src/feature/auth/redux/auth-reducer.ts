import {LoginBodyT, LoginResponseDataT, userAPI} from '../../../api/user-api'
import {appSetNoteError, appSetNoteSuccess, appSetStatus} from '../../../app/redux/app-reducer'
import {SignupFormSubmitT} from '../components/SignupForm'
import {Dispatch} from 'react'

// Thunks
export const signup = (body: SignupFormSubmitT) => {
    return async (dispatch: Dispatch<any>) => {
        const formData = new FormData()
        formData.append('name', body.name)
        formData.append('password', body.password)
        formData.append('email', body.email)
        formData.append('image', body.image as File)

        dispatch(appSetStatus('loading'))
        try {
            const res = await userAPI.signup(formData)
            if (res.status === 201) {
                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                dispatch(authSignUp())
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

export const login = (body: LoginBodyT) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(appSetStatus('loading'))
        try {
            const res = await userAPI.login(body)
            if (res.status === 200) {
                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                dispatch(authLogin(res.data))
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

// Slice
const initialState: StateT = {
    signedUp: false,
    loggedInUserId: null,
    token: null,
    tokenExpiration: null
}

export const authReducer = (state = initialState, action: ActionT): StateT => {
    switch (action.type) {
        case 'auth/SIGN_UP': {
            return {...state, signedUp: true}
        }
        case 'auth/LOGIN': {
            return {
                ...state,
                loggedInUserId: action.payload.userId,
                token: action.payload.token,
                tokenExpiration: (new Date(new Date().getTime() + 1000 * 60 * 60)).toISOString()
            }
        }
        case 'auth/LOGOUT': {
            return {
                ...state,
                loggedInUserId: null,
                token: null,
                tokenExpiration: null
            }
        }
        default: {
            return state
        }
    }
}

// Action creators
export const authSignUp = () => ({type: 'auth/SIGN_UP'} as const)
export const authLogin = (userData: LoginResponseDataT) => ({type: 'auth/LOGIN', payload: userData} as const)
export const authLogout = () => ({type: 'auth/LOGOUT'} as const)

// Types
type StateT = {
    signedUp: boolean
    loggedInUserId: string | null
    token: string | null
    tokenExpiration: string | null
}

type ActionT = ReturnType<typeof authSignUp | typeof authLogin | typeof authLogout>

// const slice = createSlice({
//     name: 'auth',
//     initialState: initialState,
//     reducers: {
//         logout(state) {
//             state.loggedInUserId = null
//             state.token = null
//             state.tokenExpiration = null
//         }
//     },
//     extraReducers: builder => {
//         builder
//             .addCase(signup.fulfilled, state => {
//                 state.signedUp = true
//             })
//         builder
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loggedInUserId = action.payload.userId
//                 state.token = action.payload.token
//                 state.tokenExpiration = (new Date(new Date().getTime() + 1000 * 60 * 60)).toISOString()
//             })
//             .addCase(login.rejected, (state) => {
//                 return state
//             })
//     }
// })