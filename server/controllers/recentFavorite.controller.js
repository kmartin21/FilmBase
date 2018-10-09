const RecentFavorite = require('../models/recentFavorite.model')
const mongoose = require('mongoose')

exports.add = (userId, movieObjectId) => {
    const recentFavorite = new RecentFavorite({
        user: mongoose.Types.ObjectId(userId),
        movie: mongoose.Types.ObjectId(movieObjectId)
    })

    recentFavorite.save((err) => {
        if (err) {
            console.log("ERROR:", err.message)
        }
        console.log("Successfully saved recent favorite")
    })
}

exports.remove = (userId, movieObjectId) => {
    RecentFavorite.find({user: userId, movie: movieObjectId})
    .remove(function(err) {
        if (err) console.log("Could not delete recent favorite:", err)
    })
}

exports.getRecents = (req, res) => {
    RecentFavorite.find()
        .populate('user')
        .populate('movie')
        .exec(function(err, results) {
            if (err) res.status(415).json({ error: `${err.message}` })
            console.log("RECENTS RESULT: ", results)
            const recentFavorites = results.map(result => {
                return {
                    user: result.user,
                    movie: result.movie
                }
            })
            res.status(201).json({ recentFavorites: recentFavorites })
        })
}





