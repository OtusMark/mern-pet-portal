import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from "uuid";

// Slice
const initialState : StateT = {
    status: 'idle',
    notifications: [],
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<AppStatusT>) {
            state.status = action.payload
        },
        setAppNoteSuccess(state, action: PayloadAction<string | null>) {
            state.notifications.push({
                id: v4(),
                type: 'success',
                message: action.payload
            })
        },
        setAppNoteError(state, action: PayloadAction<string | null>) {
            state.notifications.push({
                id: v4(),
                type: 'error',
                message: action.payload
            })
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppNoteSuccess, setAppNoteError} = slice.actions

// Types
export type AppStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

type StateT = {
    status: AppStatusT
    notifications: Array<NotificationT>
}

export type NotificationT = {
    id: string,
    type: 'success' | 'error',
    message: string | null
}