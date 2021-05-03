import {createSlice} from "@reduxjs/toolkit";


const initialState = {}

const slice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
})

export const userReducer = slice.reducer