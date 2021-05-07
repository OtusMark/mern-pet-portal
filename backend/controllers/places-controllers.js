const uuid = require('uuid')
const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world.',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'Some address',
        creatorId: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.placeId
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })

    if (!place) {
        throw new HttpError('Could not find a place for the provided Id', 404)
    }

    res.json({place})
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.userId
    const place = DUMMY_PLACES.find(p => {
        return p.creatorId === userId
    })

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided user Id', 404)
        )
    }

    res.json({place})
}

const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creatorId} = req.body
    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creatorId
    }

    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) => {
    const {title, description} = req.body
    const placeId = req.params.placeId

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatedPlace.title = title
    updatedPlace.description = description

    DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: 'Place deleted'})
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace