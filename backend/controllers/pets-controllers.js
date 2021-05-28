const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const Pet = require('../models/pet-model')
const User = require('../models/user-model')

// Get pet by Id
const getPetById = async (req, res, next) => {
    const petId = req.params.petId

    let pet
    try {
        pet = await Pet.findById(petId)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find a pet', 500)
        )
    }

    if (!pet) {
        return next(
            new HttpError('Could not find a pet for the provided Id', 404)
        )
    }

    res.json({pet: pet.toObject({getters: true})})
}

// Get pets by user Id
const getPetsByUserId = async (req, res, next) => {
    const userId = req.params.userId

    let userWithPets
    try {
        userWithPets = await User.findById(userId).populate('pets')
    } catch (err) {
        return next(
            new HttpError('Fetching pets failed, please try again later', 500)
        )
    }

    if (!userWithPets || userWithPets.pets.length === 0) {
        return next(
            new HttpError('Could not find pets for the provided user Id', 404)
        )
    }

    res.json({pets: userWithPets.pets.map(pet => pet.toObject({getters: true}))})
}

// Create new pet
const createPet = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {name, breed, dob, gender, description, creatorId} = req.body

    const createdPet = new Pet({
        name,
        breed,
        dob,
        gender,
        description,
        image: req.file.path.split('\\').join('/'), // !I! Check if the split/join is necessary. Windows file system uploads with \
        creatorId
    })

    let user
    try {
        user = await User.findById(creatorId)
    } catch {
        return next(
            new HttpError('Creating pet failed, please try again', 500)
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
        await createdPet.save({session})
        user.pets.push(createdPet)
        await user.save({session})
        await session.commitTransaction()
    } catch (err) {
        return next(
            new HttpError('Creating pet failed, please try again.', 500)
        )
    }

    res.status(201).json({pet: createdPet, message: 'New pet added'})
}

// Update pet
const updatePet = async (req, res, next) => {
    const errors = validationResult(req)
    console.log(req.body)
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {name, description} = req.body
    const petId = req.params.petId

    let pet
    try {
        pet = await Pet.findById(petId)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update pet.', 500)
        )
    }

    if (pet.creatorId.toString() !== req.userData.userId) {
        return next(
            new HttpError('You are not allowed to edit this pet', 403)
        )
    }

    pet.name = name
    pet.description = description

    try {
        await pet.save()
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update pet.', 500)
        )
    }

    res.status(200).json({pet: pet.toObject({getters: true})})
}

// Delete pet
const deletePet = async (req, res, next) => {
    const petId = req.params.petId

    let pet
    try {
        pet = await Pet.findById(petId).populate('creatorId')
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not delete pet.', 500)
        )
    }

    if (!pet) {
        return next(
            new HttpError('Could not find pet for this Id.', 404)
        )
    }

    if (pet.creatorId.id !== req.userData.userId) {
        return next(
            new HttpError('You are not allow to delete this pet.', 403)
        )
    }

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await pet.remove({session})
        pet.creatorId.pets.pull(pet)
        await pet.creatorId.save({session})
        await session.commitTransaction()
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not delete pet.', 500)
        )
    }

    res.status(200).json({message: 'Pet deleted'})
}

exports.getPetById = getPetById
exports.getPetsByUserId = getPetsByUserId
exports.createPet = createPet
exports.updatePet = updatePet
exports.deletePet = deletePet