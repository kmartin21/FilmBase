const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/login', userController.userCreate)
router.post('/user/:userId/fav-movie/:id', userController.favoriteMovie)

module.exports = router