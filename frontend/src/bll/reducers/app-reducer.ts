import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Slice
const initialState : StateT = {
    status: 'idle',
    alert: null,
    error: null,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<AppStatusT>) {
            state.status = action.payload
        },
        setAppAlert(state, action: PayloadAction<string | null>) {
            state.alert = action.payload
        },
        setAppError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppAlert, setAppError} = slice.actions

// Types
export type AppStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

type StateT = {
    status: AppStatusT
    alert: string | null
    error: string | null
}
