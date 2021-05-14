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
    loggedIn: false,
    loggedInUserId: null,
    loggedInUserToken: null
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signup.fulfilled, state => {
                state.signedUp = true
            })
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.loggedIn = !!action.payload.token
                state.loggedInUserId = action.payload.userId
                state.loggedInUserToken = action.payload.token
            })
            .addCase(login.rejected, (state) => {
                return state
            })
    }
})

export const authReducer = slice.reducer

// Types
type StateT = {
    signedUp: boolean
    loggedIn: boolean
    loggedInUserId: string | null
    loggedInUserToken: string | null
}