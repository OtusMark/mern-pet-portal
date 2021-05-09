import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {}
})