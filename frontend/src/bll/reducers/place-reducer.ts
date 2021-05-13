import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppNoteError, setAppNoteSuccess, setAppStatus} from "./app-reducer";
import {AddPlaceBodyT, placeAPI} from "../../api/places-api";

// Thunks
export const getPlacesByUserId = createAsyncThunk('place/getPlacesByUserId', async (userId: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await placeAPI.getPlaceByUserId(userId)
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            return res.data.places
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
        return thunkAPI.rejectWithValue([])
    }
})

export const addPlace = createAsyncThunk('place/addPlace', async (payload: AddPlacePayloadT, thunkAPI) => {

    const body: AddPlaceBodyT = {
        title: payload.title,
        description: payload.description,
        address: payload.address,
        creatorId: payload.creatorId
    }

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await placeAPI.addPlace(body, payload.userToken)
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

export const deletePlace = createAsyncThunk('place/deletePlace', async (placeId: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await placeAPI.deletePlace(placeId)
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return placeId
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }
})

export const updatePlace = createAsyncThunk('place/updatePlace', async (payload: UpdatePlacePayloadT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await placeAPI.updatePlace(payload.placeId,
            {
                title: payload.title,
                description: payload.description,
            }
        )
        if (res.status === 200) {

            thunkAPI.dispatch(setAppStatus('succeeded'))
            thunkAPI.dispatch(setAppNoteSuccess(res.data.message))
            return res.data.place
        }
    } catch (err) {
        thunkAPI.dispatch(setAppStatus('failed'))
        thunkAPI.dispatch(setAppNoteError(err.response.data.message))
    }

})

const initialState: Array<PlaceT> = []

const slice = createSlice({
    name: 'place',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPlacesByUserId.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(getPlacesByUserId.rejected, (state, action) => {
                return []
            })
        builder
            .addCase(addPlace.fulfilled, (state, action) => {
                state.push(action.payload)
            })
        builder
            .addCase(deletePlace.fulfilled, (state, action) => {
                return state.filter(place => place.id != action.payload)
            })
        builder
            .addCase(updatePlace.fulfilled, (state, action) => {

                return state.map(place => {
                        if (place.id === action.payload.placeId) {
                            return action.payload
                        } else return place
                    }
                )
            })
    }
})

export const placeReducer = slice.reducer

// Types
export type PlaceT = {
    id: string
    title: string
    description: string
    address: string
    image: string
    creatorId: string
    coordinates: {
        lat: number
        lng: number
    }
}

export type AddPlacePayloadT = {
    title: string
    description: string
    address: string
    creatorId: string
    userToken: string
}

export type UpdatePlacePayloadT = {
    title: string
    description: string,
    placeId: string
}