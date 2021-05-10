import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginBodyT, SignupBodyT, userAPI} from "../../api/user-api";
import {AxiosError} from "axios";

// Thunk
export const signup = createAsyncThunk('auth/signup', async (body: SignupBodyT, thunkAPI) => {

    try {
        const res = await userAPI.signup(body)
        if (res.status === 201) {

            console.log(res.data.message)
            return
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const login = createAsyncThunk('auth/login', async (body: LoginBodyT, thunkAPI) => {

    try {
        const res = await userAPI.login(body)
        if (res.status === 200) {

            console.log(res.data.message)
            return
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

// Reducer
const initialState = {
    signedUp: false,
    loggedIn: false,
    isAuthenticated: false,
    error: ''
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
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload as string
            })
        builder
            .addCase(login.fulfilled, state => {
            state.loggedIn = true
        })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
})

export const authReducer = slice.reducer