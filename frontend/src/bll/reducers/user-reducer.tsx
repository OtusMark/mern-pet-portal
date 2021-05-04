import {createSlice} from "@reduxjs/toolkit";


const initialState: Array<UserT> = [
    {
        id: '1',
        name: 'First user',
        image: 'https://i.natgeofe.com/n/c0e0a134-3e97-4b8f-9f7b-9d11f5e1bf02/comedy-wildlife-awards-squirel-stop.jpg',
        places: 5
    }
]

const slice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
})

export const userReducer = slice.reducer

// Types
export type UserT = {
    id: string
    name: string
    image: string
    places: number
}