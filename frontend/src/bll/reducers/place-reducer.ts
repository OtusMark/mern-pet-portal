import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppNoteError, setAppNoteSuccess, setAppStatus} from "./app-reducer";
import {AddPlaceBodyT, placeAPI} from "../../api/places-api";

// Thunks
export const addPlace = createAsyncThunk('place/addPlace', async (body: AddPlaceBodyT, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await placeAPI.addPlace(body)
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

const initialState: Array<PlaceT> = [
    {
        id: '1',
        title: 'place title',
        description: 'place description',
        address: 'place address',
        image: 'https://i.natgeofe.com/n/c0e0a134-3e97-4b8f-9f7b-9d11f5e1bf02/comedy-wildlife-awards-squirel-stop.jpg',
        creatorId: 'id-1',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
    }
]

const slice = createSlice({
    name: 'place',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addPlace.fulfilled, (state, action) => {

                const newPlace = {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    address: action.payload.address,
                    image: action.payload.image,
                    creatorId: action.payload.creatorId,
                    coordinates: action.payload.coordinates
                }

                state.push(newPlace)
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