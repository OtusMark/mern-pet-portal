const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/user-model')

// Get user
const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        return next(
            new HttpError('Fetching users failed, please try again later.', 500)
        )
    }

    res.json({users: users.map(user => user.toObject({getters: true}))})
}

// Signup
const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {name, email, password} = req.body

    let existingUser
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again later.', 500)
        )
    }

    if (existingUser) {
        return next(
            new HttpError('User exists, please login instead.', 422)
        )
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://i.imgflip.com/3hevtb.jpg',
        places: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again.', 500)
        )
    }

    res.status(201).json({user: createdUser.toObject({getters: true})})
}

// Login
const login = async (req, res, next) => {
    const {email, password} = req.body

    let existingUser
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        return next(
            new HttpError('Logging in failed, please try again later.', 500)
        )
    }

    if (!existingUser || existingUser.password !== password) {
        return next(
            new HttpError('Invalid credentials, could not log you in.', 401)
        )
    }

    res.json({message: 'Logged in'})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login