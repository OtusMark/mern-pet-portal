import {createSlice} from "@reduxjs/toolkit";
import {PlaceT} from "./place-reducer";

const initialState: Array<UserT> = []

const slice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
})

export const userReducer = slice.reducer

// Types
export type UserT = {
    id: string
    name: string
    image: string
    places: Array<PlaceT>
}