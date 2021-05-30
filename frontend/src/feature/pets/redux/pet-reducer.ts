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
                dispatch(setPetsList(res.data.pets))
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
        }
    }
}

export const addPet = (payload: AddPetFormSubmitT) => {

    return async (dispatch: Dispatch<any>) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('breed', payload.breed)
        formData.append('dob', payload.dob)
        formData.append('gender', payload.gender)
        formData.append('description', payload.description)
        formData.append('lookingForBreading', JSON.stringify(payload.lookingForBreading))
        formData.append('image', payload.image as File)
        formData.append('creatorId', payload.creatorId)

        dispatch(appSetStatus('loading'))
        try {
            const res = await petAPI.addPet(payload.token, formData)
            if (res.status === 201) {

                dispatch(appSetStatus('succeeded'))
                dispatch(appSetNoteSuccess(res.data.message))
                dispatch(addPetToPetList(res.data.pet))
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
                dispatch(deletePetFromPetList(payload.petId))
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
                dispatch(updatePetById(res.data.pet))
            }
        } catch (err) {
            dispatch(appSetStatus('failed'))
            dispatch(appSetNoteError(err.response.data.message))
        }
    }
}

const initialState: Array<PetT> = []

export const petReducer = (state = initialState, action: actionT): StateT => {
    switch (action.type) {
        case 'pet/SET_PETS_LIST': {
            return action.payload.map((pet: PetT) => {
                    return {
                        id: pet.id,
                        name: pet.name,
                        description: pet.description,
                        image: `http://localhost:5000/${pet.image}`,
                        creatorId: pet.creatorId
                    }
                })
        }
        case 'pet/ADD_PET_TO_PET_LIST': {
            return [...state, action.payload]
        }
        case 'pet/UPDATE_PET_BY_ID': {
            return state.filter(pet => pet.id != action.payload)
        }
        case 'pet/DELETE_PET_FROM_PET_LIST': {
            return state.filter(pet => pet.id != action.payload)
        }
        default: {
            return state
        }
    }
}

// Action creators
export const setPetsList = (petsList: Array<PetT>) => ({type: 'pet/SET_PETS_LIST', payload: petsList} as const)
export const addPetToPetList = (pet: PetT) => ({type: 'pet/ADD_PET_TO_PET_LIST', payload: pet} as const)
export const updatePetById = (petId: string) => ({type: 'pet/UPDATE_PET_BY_ID', payload: petId} as const)
export const deletePetFromPetList = (petId: string) => ({type: 'pet/DELETE_PET_FROM_PET_LIST', payload: petId} as const)


// Types
export type StateT = typeof initialState

export type actionT = ReturnType<typeof setPetsList |
    typeof addPetToPetList |
    typeof updatePetById |
    typeof deletePetFromPetList>

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