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

            const recentFavorites = results.map(result => {

                const opinion = result.user.favoriteMovies.find(favoriteMovie => favoriteMovie.movie.equals(result.movie._id)).opinion
                const movie = {
                    _id: result.movie._id,
                    movieId: result.movie.movieId,
                    title: result.movie.title,
                    description: result.movie.description,
                    image_url: result.movie.image_url,
                    opinion: opinion
                }
                
                return {
                    user: result.user,
                    movie: movie
                }
            })
            res.status(201).json({ recentFavorites: recentFavorites })
        })
}





