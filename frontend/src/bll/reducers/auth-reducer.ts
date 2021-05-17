import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginBodyT, SignupBodyT, userAPI} from "../../api/user-api";
import {setAppNoteError, setAppNoteSuccess, setAppStatus} from "./app-reducer";

// Thunks
export const signup = createAsyncThunk('auth/signup', async (body: SignupBodyT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await userAPI.signup(body)
        if (res.status === 201) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

export const login = createAsyncThunk('auth/login', async (body: LoginBodyT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await userAPI.login(body)
        if (res.status === 200) {

            console.log('In success')
            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return res.data
        }
    } catch (err) {
        console.log('In fail')
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
        return thunkAPI.rejectWithValue(null)
    }
})

// Slice
const initialState: StateT = {
    signedUp: false,
    loggedInUserId: null,
    token: null,
    tokenExpiration: null
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.loggedInUserId = null
            state.token = null
            state.tokenExpiration = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signup.fulfilled, state => {
                state.signedUp = true
            })
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.loggedInUserId = action.payload.userId
                state.token = action.payload.token
                state.tokenExpiration = (new Date(new Date().getTime() + 1000 * 60 * 60)).toISOString()
            })
            .addCase(login.rejected, (state) => {
                return state
            })
    }
})

export const authReducer = slice.reducer
export const {logout} = slice.actions

// Types
type StateT = {
    signedUp: boolean
    loggedInUserId: string | null
    token: string | null
    tokenExpiration: string | null
}