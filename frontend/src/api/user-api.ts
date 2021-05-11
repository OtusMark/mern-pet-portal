import axios from 'axios'

// Instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
})

// API
export const userAPI = {
    signup(body: SignupBodyT) {
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
export type SignupBodyT = {
    name: string,
    email: string,
    password: string
}

export type LoginBodyT = {
    email: string,
    password: string
}