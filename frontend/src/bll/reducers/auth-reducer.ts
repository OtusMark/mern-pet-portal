import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginBodyT, SignupBodyT, userAPI} from "../../api/user-api";
import {setAppNoteError, setAppNoteSuccess, setAppStatus } from "./app-reducer";

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

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

// Slice
const initialState = {
    signedUp: false,
    loggedIn: false,
    isAuthenticated: false,
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
            .addCase(login.fulfilled, state => {
            state.loggedIn = true
        })
    }
})

export const authReducer = slice.reducer