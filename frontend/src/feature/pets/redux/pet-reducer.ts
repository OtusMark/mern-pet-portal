import {createAsyncThunk} from '@reduxjs/toolkit'
import {appSetNoteError, appSetNoteSuccess, appSetStatus} from '../../../app/redux/app-reducer'
import {petAPI} from '../../../api/pet-api'
import {AddPetFormSubmitT} from '../pages/AddPetPage'
import {Dispatch} from 'react'

// Thunks
export const getPetsByUserId = (userId: string) => {

    return async (dispatch: Dispatch<any>) => {
        dispatch(appSetStatus('loading'))
        try {
            const res = await petAPI.getPetByUserId(userId)
            if (res.status === 200) {

                dispatch(appSetStatus('succeeded'))
                // return res.data.pets
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            // return rejectWithValue([])
        }
    }
}

export const addPet = (payload: AddPetFormSubmitT) => {

    return async (dispatch: Dispatch<any>) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('description', payload.description)
        formData.append('image', payload.image as File)
        formData.append('creatorId', payload.creatorId)

        dispatch(appSetStatus('loading'))
        try {
            const res = await petAPI.addPet(payload.token, formData)
            if (res.status === 201) {

                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                // return res.data.pet
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

export const deletePet = (payload: DeletePetPayloadT) => {

    return async (dispatch: Dispatch<any>) => {
        dispatch(appSetStatus('loading'))
        try {
            const res = await petAPI.deletePet(payload.petId, payload.token)
            if (res.status === 200) {

                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                // return payload.petId
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

export const updatePet = (payload: UpdatePetPayloadT) => {

    return async (dispatch: Dispatch<any>) => {
        dispatch(appSetStatus('loading'))
        try {
            const res = await petAPI.updatePet(payload.petId, payload.token, {
                name: payload.name,
                description: payload.description
            })
            if (res.status === 200) {

                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                // return res.data.pet
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

const initialState: Array<PetT> = []

export const petReducer = (state = initialState, action: any) => {
    switch (action.payload) {
        case 'pet/SET_PET': {

        }
    }
}

// Types
export type PetT = {
    id: string
    name: string
    description: string
    image: string
    creatorId: string
}

export type DeletePetPayloadT = {
    petId: string,
    token: string
}

export type UpdatePetPayloadT = {
    name: string
    description: string,
    petId: string,
    token: string
}

// const slice = createSlice({
//     name: 'pet',
//     initialState: initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(getPetsByUserId.fulfilled, (state, action) => {
//                 return action.payload.map((pet: PetT) => {
//                     return {
//                         id: pet.id,
//                         name: pet.name,
//                         description: pet.description,
//                         image: `http://localhost:5000/${pet.image}`,
//                         creatorId: pet.creatorId
//                     }
//                 })
//             })
//             .addCase(getPetsByUserId.rejected, () => {
//                 return []
//             })
//         builder
//             .addCase(addPet.fulfilled, (state, action) => {
//                 state.push(action.payload)
//             })
//         builder
//             .addCase(deletePet.fulfilled, (state, action) => {
//                 return state.filter(place => place.id != action.payload)
//             })
//         builder
//             .addCase(updatePet.fulfilled, (state, action) => {
//
//                 return state.map(pet => {
//                         if (pet.id === action.payload.petId) {
//                             return action.payload
//                         } else return pet
//                     }
//                 )
//             })
//     }
// })

// export const petReducer = slice.reducer