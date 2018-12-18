const User = require('../models/user.model')
const movieController = require('./movie.controller')
const recentFavoriteController = require('./recentFavorite.controller')
const mongoose = require('mongoose')

exports.userCreate = (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        imageUrl: req.body.imageUrl
    })
    
    User.findOne({username: `${user.username}`}, function(err, foundUser) {
        if (err) return res.json({ error: `${err.message}` })

        if (!foundUser) {
            user.save((err, user) => {
                if (err) return res.json({ error: `${err.message}` })

                const favMovieObjsPromise = getUserFavMovieObjs(user._id)
                favMovieObjsPromise.then((favMovieObjs) => res.status(201).json({ userId: user._id, name: user.name, imageUrl: user.imageUrl, favoriteMovies: favMovieObjs }))
                .catch((err) => res.json({ error: `${err.message}` }))
            })
        } else {
            const imageUrl = `${user.imageUrl}`
            User.updateOne({_id: foundUser._id}, {$set: {"imageUrl": imageUrl}}, (err) => {
                if (err) return res.json({ error: `${err.message}` })

                const favMovieObjsPromise = getUserFavMovieObjs(foundUser._id)
                favMovieObjsPromise.then((favMovieObjs) => res.json({ userId: foundUser._id, name: user.name, imageUrl: user.imageUrl, favoriteMovies: favMovieObjs }))
                .catch((err) => res.json({ error: `${err.message}` }))
            })
        }
    })
}

exports.favoriteMovie = (req, res) => {
    const movieId = parseInt(req.params.id)
    const saveMoviePromise = movieController.saveMovieIfDoesNotExist(movieId, req.body)
    
    saveMoviePromise.then((movieObjectId) => {
        User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, user) {
            if (err) return res.status(500).json({ error: `${err.message}` })
            if (!user) return res.status(404).json({ error: "User not found" })

            if (!user.favoriteMovies.find(favoriteMovie => favoriteMovie.movie === movieObjectId)) {
                const favMovie = {
                    movie: mongoose.Types.ObjectId(movieObjectId)
                }
                user.favoriteMovies.push(favMovie)
                user.save((err, user) => {
                    if (err) return res.status(500).json({ error: `${err.message}` })
                    else {
                        recentFavoriteController.add(req.params.userId, movieObjectId)

                        const favMovieObjsPromise = getUserFavMovieObjs(user._id)
                        favMovieObjsPromise.then((favMovieObjs) => res.json({ msg: "Favorited movie successfully", favoriteMovies: favMovieObjs}))
                        .catch((err) => res.status(500).json({ error: `${err.message}` }))
                    }
                })
            } else {
                res.status(304)
            }
        })
    })
    .catch(err => res.status(500).json({ error: `${err.message}` }))
}

exports.unfavoriteMovie = (req, res) => {
    const movieId = parseInt(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) res.status(404).json({ error: "User not found" })

    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, foundUser) {
        if (err) return res.status(500).json({ error: `${err.message}` })
        if (!foundUser) return res.status(404).json({ error: "User not found" })

        User.find({_id: mongoose.Types.ObjectId(req.params.userId)})
        .populate('favoriteMovies.movie')
        .exec((err, result) => {
            const user = result[0]
            const favoriteMovies = user.favoriteMovies
            if (err) return res.status(500).json({ error: `${err.message}` })

            const movieToDelete = favoriteMovies.find(favoriteMovie => favoriteMovie.movie.movieId === movieId).movie._id
            if (movieToDelete === undefined) return res.status(404).json({ error: `${err.message}` })

            const filteredFavMovies = user.favoriteMovies.filter(favoriteMovie => !favoriteMovie.movie.equals(movieToDelete))

            user.favoriteMovies = filteredFavMovies
            user.save((err, user) => {
                if (err) return res.status(500).json({ error: `${err.message}` })

                const favMovieObjsPromise = getUserFavMovieObjs(user._id)
                favMovieObjsPromise.then((favMovieObjs) => {
                    recentFavoriteController.remove(user._id, movieToDelete)
                    res.json({ msg: "Unfavorited movie successfully", favoriteMovies: favMovieObjs})
                })
                .catch((err) => res.status(500).json({ error: `${err.message}` }))
            })
        })
    })
}

exports.writeOpinion = (req, res) => {
    const movieId = parseInt(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) return res.status(404).json({ error: "User not found" })

    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function(err, foundUser) {
        if (err) return res.status(500).json({ error: `${err.message}` })
        if (!foundUser) return res.status(404).json({ error: "User not found" })

        User.find({_id: mongoose.Types.ObjectId(req.params.userId)})
        .populate('favoriteMovies.movie')
        .exec((err, result) => {
            if (err) return res.status(500).json({ error: `${err.message}` })
            const user = result[0]
            const favoriteMovies = user.favoriteMovies
            
            const movieToFindId = favoriteMovies.find(favoriteMovie => favoriteMovie.movie.movieId === movieId).movie._id
            if (movieToFindId === undefined) return res.status(404).json({ error: "Movie not found" })

            const movieForOpinion = user.favoriteMovies.find(favoriteMovie => favoriteMovie.movie.equals(movieToFindId))
            movieForOpinion.opinion = req.body.opinion
            user.save((err, user) => {
                if (err) return res.status(500).json({ error: `${err.message}` })
                
                const favMovieObjsPromise = getUserFavMovieObjs(user._id)

                favMovieObjsPromise.then((favMovieObjs) => {
                    return res.json({ msg: "Successfully added opinion", favoriteMovies: favMovieObjs})
                })
                .catch((err) => {
                    return res.status(500).json({ error: `${err.message}` })
                })
            })
        })
    })
}

exports.getUserProfile = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ error: "User not found" })

    User.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, foundUser) {
        if (err) return res.status(500).json({ error: `${err.message}` })
        if (!foundUser) return res.status(404).json({ error: "User not found" })
        
        User.find({_id: mongoose.Types.ObjectId(req.params.id)})
        .populate('favoriteMovies.movie')
        .exec((err, result) => {
            if (err) res.status(404).json({ error: `${err.message}` })
            const user = result[0]

            const favoriteMovies = user.favoriteMovies.map(movieData => {

                const movie = {
                    _id: movieData.movie._id,
                    movieId: movieData.movie.movieId,
                    title: movieData.movie.title,
                    description: movieData.movie.description,
                    image_url: movieData.movie.image_url,
                    opinion: movieData.opinion
                }
                
                return {
                    user: user,
                    movie: movie
                }
            })

            res.json({ msg: 'Successfully retrieved user profile', user: user, favoriteMovies: favoriteMovies })
        })
    })
}

getUserFavMovieObjs = (id) => {
    return new Promise((resolve, reject) => {
        User.find({_id: id})
        .populate('favoriteMovies.movie')
        .exec(function(err, moviesResult) {
            if (err) reject(err)
            if (moviesResult.length > 0) {
                const favoriteMoviesObjs = moviesResult[0].favoriteMovies.map(favoriteMovie => {
                    return {
                        movieId: favoriteMovie.movie.movieId,
                        opinion: favoriteMovie.opinion && favoriteMovie.opinion !== undefined ? favoriteMovie.opinion : ''
                    }
                })
                resolve(favoriteMoviesObjs)
            }
            resolve([])
        })
    })
}




