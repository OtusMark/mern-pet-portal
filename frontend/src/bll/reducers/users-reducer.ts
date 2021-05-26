import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {PetT} from './pet-reducer'
import {setAppNoteError, setAppStatus} from './app-reducer'
import {userAPI} from '../../api/user-api'

// Thunks
export const getUsers = createAsyncThunk('users/getUsers', async (param, thunkAPI) => {

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
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                return action.payload.map((user: ResponseUserT) => {
                    return {
                        id: user.id,
                        name: user.name,
                        image: `http://localhost:5000/${user.image}`,
                        pets: user.pets
                    }
                })
            })
    }
})

export const usersReducer = slice.reducer

// Types
type ResponseUserT = {
    email: string
    id: string
    image: string
    name: string
    pets: Array<PetT>
}

export type UserT = {
    id: string
    name: string
    image: string
    pets: Array<PetT>
}