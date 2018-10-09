const User = require('../models/user.model')
const movieController = require('./movie.controller')
const recentFavoriteController = require('./recentFavorite.controller')
const mongoose = require('mongoose')

exports.userCreate = (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username
    })
    
    User.findOne({username: `${user.username}`}, function(err, result) {
        if (err) { 
            res.status(415).json({ error: `${err.message}` })
        }

        if (!result) {
            user.save((err, user) => {
                if (err) {
                    res.status(415).json({ error: `${err.message}` })
                }
                res.status(201).json({ userId: user._id, favoriteMovies: user.favoriteMovies })
            })
        } else {
            res.json({ userId: result._id, favoriteMovies: result.favoriteMovies })
        }
    })
}

exports.favoriteMovie = (req, res) => {
    const movieId = parseInt(req.params.id)
    const saveMoviePromise = movieController.saveMovieIfDoesNotExist(movieId, req.body)
    
    saveMoviePromise.then((movieObjectId) => {
        User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, user) {
            if (err) res.status(415).json({ error: `${err.message}` })
            if (!user.favoriteMovies.find(favoriteMovie => favoriteMovie.movie === movieObjectId)) {
                const favMovie = {
                    movie: mongoose.Types.ObjectId(movieObjectId)
                }
                user.favoriteMovies.push(favMovie)
                user.save((err, user) => {
                    if (err) res.status(415).json({ error: `${err.message}` })
                    else {
                        recentFavoriteController.add(req.params.userId, movieObjectId)

                        User.find({_id: user._id})
                        .populate('favoriteMovies.movie')
                        .exec(function(err, result) {
                            if (err) res.status(415).json({ error: `${err.message}` })
                            const favoriteMoviesIds = result[0].favoriteMovies.map(favoriteMovie => favoriteMovie.movie.movieId)
                            res.json({ msg: "Favorited movie successfully", favoriteMovies: favoriteMoviesIds})
                        }) 
                    }
                })
            }
        })
    })
    .catch(err => res.status(415).json({ error: `${err.message}` }))
}

exports.unfavoriteMovie = (req, res) => {
    const movieId = parseInt(req.params.id)
    
    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, user) {

        if (err) res.status(415).json({ error: `${err.message}` })
        User.find({_id: user._id})
        .populate('favoriteMovies.movie')
        .exec((err, result) => {
            const favoriteMovies = result[0].favoriteMovies
            if (err) res.status(415).json({ error: `${err.message}` })

            const movieToDelete = favoriteMovies.find(favoriteMovie => favoriteMovie.movie.movieId === movieId).movie._id
            
            const filteredFavMovies = user.favoriteMovies.filter(favoriteMovie => {
                return !favoriteMovie.movie.equals(movieToDelete)
            })

            user.favoriteMovies = filteredFavMovies
            user.save((err, user) => {
                if (err) {
                    res.status(415).json({ error: `${err.message}` })
                }

                User.find({_id: user._id})
                .populate('favoriteMovies.movie')
                .exec(function(err, result) {
                    if (err) res.status(415).json({ error: `${err.message}` })
                    const favoriteMoviesIds = result[0].favoriteMovies.map(favoriteMovie => favoriteMovie.movie.movieId)
                    recentFavoriteController.remove(user._id, movieToDelete)
                    res.json({ msg: "Favorited movie successfully", favoriteMovies: favoriteMoviesIds})
                })
            })
        })
    })
}

exports.writeOpinion = (req, res) => {
    const movieId = parseInt(req.params.id)

    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, user) {
        if (err) res.status(415).json({ error: `${err.message}` })

        User.find({_id: user._id})
        .populate('favoriteMovies.movie')
        .exec((err, result) => {
            const favoriteMovies = result[0].favoriteMovies
            if (err) res.status(415).json({ error: `${err.message}` })
            console.log("WRITE OPINION:", favoriteMovies)
            const movieToDelete = favoriteMovies.find(favoriteMovie => favoriteMovie.movie.movieId === movieId).movie._id
            const movieForOpinion = user.favoriteMovies.find(favoriteMovie => favoriteMovie.movie.equals(movieToDelete))
            movieForOpinion.opinion = req.body.opinion
            user.save((err) => {
                if (err) {
                    res.status(415).json({ error: `${err.message}` })
                }
                res.json({ msg: 'Successfully added opinion'})
            })
        })
    })
}




