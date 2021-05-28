import {PetT} from '../../pets/redux/pet-reducer'
import {appSetNoteError, appSetStatus} from '../../../app/redux/app-reducer'
import {userAPI} from '../../../api/user-api'
import {Dispatch} from 'react'

// Thunks
export const getUsers = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(appSetStatus('loading'))
        try {
            const res = await userAPI.getUsers()
            if (res.status === 200) {
                console.log(res.data.users)
                dispatch(appSetStatus('succeeded'))
                dispatch(usersSetUsers(res.data.users))
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

// Slice
const initialState: Array<UserT> = [] as Array<UserT>

export const usersReducer = (state = initialState, action: ActionT): StateT => {
    switch (action.type) {
        case 'users/GET_USERS': {
            return action.payload.map((user: UserT) => {
                return {
                    id: user.id,
                    name: user.name,
                    image: `http://localhost:5000/${user.image}`,
                    pets: [...user.pets]
                }
            })
        }
        default: {
            return state
        }
    }
}

export const usersSetUsers = (usersData: Array<UserT>) => ({type: 'users/GET_USERS', payload: usersData})

// Types
type StateT = typeof initialState

type ActionT = ReturnType<typeof usersSetUsers>

export type UserT = {
    id: string
    name: string
    image: string
    pets: Array<PetT>
}

// const slice = createSlice({
//     name: 'users',
//     initialState: initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(getUsers.fulfilled, (state, action) => {
//                 return action.payload.map((user: ResponseUserT) => {
//                     return {
//                         id: user.id,
//                         name: user.name,
//                         image: `http://localhost:5000/${user.image}`,
//                         pets: user.pets
//                     }
//                 })
//             })
//     }
// })