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
    addPlace(token: string, body: AddPlaceBodyT,) {
        return instance.post('/', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    updatePlace(placeId: string, token: string, body: UpdatedPlaceBodyT) {
        return instance.patch(`/${placeId}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    deletePlace(placeId: string, token: string) {
        return instance.delete(`/${placeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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