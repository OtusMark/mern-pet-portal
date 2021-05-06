import {createSlice} from "@reduxjs/toolkit";


const initialState: Array<PlaceT> = [
    {
        id: '1',
        title: 'place title',
        description: 'place description',
        address: 'place address',
        imageUrl: 'https://i.natgeofe.com/n/c0e0a134-3e97-4b8f-9f7b-9d11f5e1bf02/comedy-wildlife-awards-squirel-stop.jpg',
        creatorId: 'id-1',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
    },
    {
        id: '2',
        title: 'place 2 title',
        description: 'place description',
        address: 'place address',
        imageUrl: 'https://i.natgeofe.com/n/c0e0a134-3e97-4b8f-9f7b-9d11f5e1bf02/comedy-wildlife-awards-squirel-stop.jpg',
        creatorId: 'id-2',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
    }
]

const slice = createSlice({
    name: 'place',
    initialState: initialState,
    reducers: {}
})

export const placeReducer = slice.reducer

// Types
export type PlaceT = {
    id: string
    title: string
    description: string
    address: string
    imageUrl: string
    creatorId: string
    coordinates: {
        lat: number
        lng: number
    }
}