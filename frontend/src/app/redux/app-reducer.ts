import {v4} from 'uuid'

const initialState: StateT = {
    status: 'idle',
    notifications: [],
}

export const appReducer = (state = initialState, action: ActionsT): StateT => {
    switch (action.type) {
        case 'app/SET_STATUS': {
            return {...state, status: action.payload}
        }
        case 'app/SET_NOTE_SUCCESS': {
            return {
                ...state, notifications:
                    [...state.notifications, {id: v4(), type: 'success', message: action.payload}]
            }
        }
        case 'app/SET_NOTE_ERROR': {
            return {
                ...state, notifications:
                    [...state.notifications, {id: v4(), type: 'error', message: action.payload}]
            }
        }
        case 'app/REMOVE_NOTE': {
            return {
                ...state, notifications: state.notifications.filter((note: NotificationT) => {
                    return note.id !== action.payload
                })
            }
        }
        default: {
            return state
        }
    }
}

// Action creators
export const appSetStatus = (status: AppStatusT) => ({type: 'app/SET_STATUS', payload: status} as const)
export const appSetNoteSuccess = (message: string) => ({type: 'app/SET_NOTE_SUCCESS', payload: message} as const)
export const appSetNoteError = (message: string) => ({type: 'app/SET_NOTE_ERROR', payload: message} as const)
export const appSetRemoveNote = (noteId: string) => ({type: 'app/REMOVE_NOTE', payload: noteId} as const)

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

type ActionsT = ReturnType<typeof appSetStatus
    | typeof appSetNoteSuccess
    | typeof appSetNoteError
    | typeof appSetRemoveNote>

// const slice = createSlice({
//     name: 'app',
//     initialState: initialState,
//     reducers: {
//         setAppStatus(state, action: PayloadAction<AppStatusT>) {
//             state.status = action.payload
//         },
//         setAppNoteSuccess(state, action: PayloadAction<string | null>) {
//             state.notifications.push({
//                 id: v4(),
//                 type: 'success',
//                 message: action.payload
//             })
//         },
//         setAppNoteError(state, action: PayloadAction<string | null>) {
//             state.notifications.push({
//                 id: v4(),
//                 type: 'error',
//                 message: action.payload
//             })
//         },
//         removeAppNote(state, action: PayloadAction<string>) {
//             state.notifications = state.notifications.filter((note: NotificationT) => {
//                 return note.id !== action.payload
//             })
//         }
//     }
// })