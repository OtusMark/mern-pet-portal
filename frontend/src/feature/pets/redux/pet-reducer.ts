import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {setAppNoteError, setAppNoteSuccess, setAppStatus} from '../../../app/redux/app-reducer'
import {petAPI} from '../../../api/pet-api'
import {AddPetFormSubmitT} from '../pages/AddPetPage'

// Thunks
export const getPetsByUserId = createAsyncThunk('pet/get-pets-by-user-id', async (userId: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await petAPI.getPetByUserId(userId)
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            return res.data.pets
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        return thunkAPI.rejectWithValue([])
    }
})

export const addPet = createAsyncThunk('pet/add-pet', async (payload: AddPetFormSubmitT, thunkAPI) => {

    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('description', payload.description)
    formData.append('image', payload.image as File)
    formData.append('creatorId', payload.creatorId)

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await petAPI.addPet(payload.token, formData)
        if (res.status === 201) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return res.data.place
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

export const deletePet = createAsyncThunk('pet/delete-pet', async (payload: DeletePetPayloadT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await petAPI.deletePet(payload.petId, payload.token)
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return payload.petId
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

export const updatePet = createAsyncThunk('pet/update-pet', async (payload: UpdatePetPayloadT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await petAPI.updatePet(payload.petId, payload.token, {
            name: payload.name,
            description: payload.description
        })
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return res.data.pet
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }

})

const initialState: Array<PetT> = []

const slice = createSlice({
    name: 'pet',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPetsByUserId.fulfilled, (state, action) => {
                return action.payload.map((pet: PetT) => {
                    return {
                        id: pet.id,
                        name: pet.name,
                        description: pet.description,
                        image: `http://localhost:5000/${pet.image}`,
                        creatorId: pet.creatorId
                    }
                })
            })
            .addCase(getPetsByUserId.rejected, () => {
                return []
            })
        builder
            .addCase(addPet.fulfilled, (state, action) => {
                state.push(action.payload)
            })
        builder
            .addCase(deletePet.fulfilled, (state, action) => {
                return state.filter(place => place.id != action.payload)
            })
        builder
            .addCase(updatePet.fulfilled, (state, action) => {

                return state.map(pet => {
                        if (pet.id === action.payload.petId) {
                            return action.payload
                        } else return pet
                    }
                )
            })
    }
})

export const petReducer = slice.reducer

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