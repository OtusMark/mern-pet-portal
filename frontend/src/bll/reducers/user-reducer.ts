import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PlaceT} from "./place-reducer";
import {setAppNoteError, setAppNoteSuccess, setAppStatus} from "./app-reducer";
import {userAPI} from "../../api/user-api";

// Thunks
export const getUsers = createAsyncThunk('user/getUsers', async (param, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await userAPI.getUsers()
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            return res.data.users
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

// Slice
const initialState: Array<UserT> = [] as Array<UserT>

const slice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                return action.payload.map((user: ResponseUserT) => {
                    return {
                        id: user.id,
                        name: user.name,
                        image: user.image,
                        places: user.places
                    }
                })
            })
    }
})

export const userReducer = slice.reducer

// Types
type ResponseUserT = {
    email: string
    id: string
    image: string
    name: string
    places: Array<PlaceT>
    __v: number
    _id: string
}

export type UserT = {
    id: string
    name: string
    image: string
    places: Array<PlaceT>
}