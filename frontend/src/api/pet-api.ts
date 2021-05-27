import axios from 'axios'

// Instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/pets',
})

// API
export const petAPI = {
    // getPlaceByPlaceId(placeId: string) {
    //     return instance.get(`/${placeId}`)
    // },
    getPetByUserId(userId: string) {
        return instance.get(`/user/${userId}`)
    },
    addPet(token: string, body: FormData,) {
        return instance.post('/', body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updatePet(petId: string, token: string, body: UpdatedPetBodyT) {
        return instance.patch(`/${petId}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    deletePet(petId: string, token: string) {
        return instance.delete(`/${petId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
}

// Types
export type UpdatedPetBodyT = {
    name: string
    description: string
}