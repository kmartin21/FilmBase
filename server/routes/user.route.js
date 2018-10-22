const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const userController = require('../controllers/user.controller')

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://film-base.auth0.com/.well-known/jwks.json`
    }),

    audience: 'gec4UrR9vEWzdQBCrobGTdP5rnNUi4Bz',
    issuer: `https://film-base.auth0.com/`,
    algorithms: ['RS256']
})

router.get('/user/:id/profile', userController.getUserProfile)

router.post('/login', userController.userCreate)
router.post('/user/:userId/fav-movie/:id', checkJwt, userController.favoriteMovie)
router.post('/user/:userId/fav-movie/:id/opinion', checkJwt, userController.writeOpinion)

router.delete('/user/:userId/fav-movie/:id', checkJwt, userController.unfavoriteMovie)

module.exports = router