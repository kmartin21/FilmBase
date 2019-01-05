const express = require('express')
const router = express.Router()

const recentFavoriteController = require('../controllers/recentFavorite.controller')

router.get('/', recentFavoriteController.getRecents)

module.exports = router


