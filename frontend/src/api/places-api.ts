import axios from "axios";

// Instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/places',
    headers: {
        'Content-Type': 'application/json'
    }
})

// API
export const placeAPI = {
    // getPlaceByPlaceId(placeId: string) {
    //     return instance.get(`/${placeId}`)
    // },
    getPlaceByUserId(userId: string) {
        return instance.get(`/user/${userId}`)
    },
    addPlace(body: AddPlaceBodyT) {
        return instance.post('/', body)
    },
    updatePlace(placeId: string ,body: UpdatedPlaceBodyT) {
        return instance.patch(`/${placeId}`, body)
    },
    deletePlace(placeId: string) {
        return instance.delete(`/${placeId}`)
    },
}

// Types
export type AddPlaceBodyT = {
    title: string
    description: string
    address: string
    creatorId: string
}

export type UpdatedPlaceBodyT = {
    title: string
    description: string
}