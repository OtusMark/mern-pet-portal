const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Authorization: 'Bearer TOKEN' - to get the token you need to use split
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_MAIN)
        req.userData = {userId: decodedToken.userId}
        next()
    } catch (err) {
        return next(
            new HttpError('Authentication failed!', 401)
        )
    }
}