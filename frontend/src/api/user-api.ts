import axios from 'axios'
import {PetT} from '../feature/pets/redux/pet-reducer'

// Instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/users'
})

// API
export const userAPI = {
    signup(body: FormData) {
        return instance.post('/signup', body)
    },
    login(body: LoginBodyT) {
        return instance.post('/login', body)
    },
    getUsers() {
        return instance.get('/')
    }
}

// Types
export type LoginBodyT = {
    email: string,
    password: string
}

export type LoginResponseDataT = {
    userId: string
    token: string
}