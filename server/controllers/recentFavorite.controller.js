const RecentFavorite = require('../models/recentFavorite.model')
const User = require('../models/user.model')
const Movie = require('../models/movie.model')
const mongoose = require('mongoose')

exports.add = (userId, movieId) => {
    const recentFavorite = new RecentFavorite({
        user: mongoose.Types.ObjectId(userId),
        movie: mongoose.Types.ObjectId(movieId)
    })

    recentFavorite.save((err) => {
        if (err) {
            console.log("ERROR:", err.message)
        }
        console.log("Successfully saved recent favorite")
    })
}

exports.getRecents = (req, res) => {
    RecentFavorite.find()
        .populate('user')
        .populate('movie')
        .exec(function(err, results) {
            console.log("RECENTS ERR: ", err)
            console.log("RECENTS RESULTS: ", results)
        })
}





