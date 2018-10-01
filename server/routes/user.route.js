const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/login', userController.userCreate)
router.post('/user/:userId/fav-movie/:id', userController.favoriteMovie)
router.delete('/user/:userId/fav-movie/:id', userController.unfavoriteMovie)

module.exports = router