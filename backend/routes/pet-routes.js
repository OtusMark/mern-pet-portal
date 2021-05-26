const express = require('express')
const {check} = require('express-validator')
const petsControllers = require('../controllers/pets-controllers')
const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')

const router = express.Router()

router.get('/:petId', petsControllers.getPetById)

router.get('/user/:userId', petsControllers.getPetsByUserId)

// Blocked for unauthenticated users
router.use(checkAuth)

router.post(
    '/',
    fileUpload.single('image'),
    [
        check('name')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5}),
    ],
    petsControllers.createPet
)

router.patch(
    '/:petId',
    [
        check('name')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5})
    ],
    petsControllers.updatePet
)

router.delete('/:petId', petsControllers.deletePet)

module.exports = router