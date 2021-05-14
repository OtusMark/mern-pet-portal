const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place-model')
const User = require('../models/user-model')

// Get place by Id
const getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeId

    let place
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find a place', 500)
        )
    }

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided Id', 404)
        )
    }

    res.json({place: place.toObject({getters: true})})
}

// Get places by user Id
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.userId

    let userWithPlaces
    try {
        userWithPlaces = await User.findById(userId).populate('places')
    } catch (err) {
        return next(
            new HttpError('Fetching places failed, please try again later', 500)
        )
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(
            new HttpError('Could not find places for the provided user Id', 404)
        )
    }

    res.json({places: userWithPlaces.places.map(place => place.toObject({getters: true}))})
}

// Create new place
const createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description, address, creatorId} = req.body

    const coordinates = getCoordsForAddress(address)

    const createdPlace = new Place({
        title,
        description,
        address,
        coordinates,
        image: 'https://lh3.googleusercontent.com/_qA0oHc5NXa4/TVq1iv0eI_I/AAAAAAAAAcU/2XSvva4aMzU/s400/DaisyOwl.jpg',
        creatorId
    })

    let user
    try {
        user = await User.findById(creatorId)
    } catch {
        return next(
            new HttpError('Creating place failed, please try again', 500)
        )
    }

    if (!user) {
        return next(
            new HttpError('Could not find user for provided id', 404)
        )
    }

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await createdPlace.save({session})
        user.places.push(createdPlace)
        await user.save({session})
        await session.commitTransaction()
    } catch (err) {
        return next(
            new HttpError('Creating place failed, please try again.', 500)
        )
    }

    res.status(201).json({place: createdPlace, message: 'New place created'})
}

// Update place
const updatePlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description} = req.body
    const placeId = req.params.placeId

    let place
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        )
    }

    if (place.creatorId.toString() !== req.userData.userId) {
        return next(
            new HttpError('You are not allowed to edit this place', 403)
        )
    }

    place.title = title
    place.description = description

    try {
        await place.save()
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        )
    }

    res.status(200).json({place: place.toObject({getters: true})})
}

// Delete place
const deletePlace = async (req, res, next) => {
    const placeId = req.params.placeId

    let place
    try {
        place = await Place.findById(placeId).populate('creatorId')
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not delete place.', 500)
        )
    }

    if (!place) {
        return next(
            new HttpError('Could not find place for this Id.', 404)
        )
    }

    if (place.creatorId.id !== req.userData.userId) {
        return next(
            new HttpError('You are not allow to delete this place.', 403)
        )
    }

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await place.remove({session})
        place.creatorId.places.pull(place)
        await place.creatorId.save({session})
        await session.commitTransaction()
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not delete place.', 500)
        )
    }

    res.status(200).json({message: 'Place deleted'})
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace