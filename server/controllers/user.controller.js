const User = require('../models/user.model')
const movieController = require('./movie.controller')
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
                res.status(201).json({ userId: `${user._id}` })
            })
        } else {
            res.json({ userId: `${result._id}` })
        }
    })
}

exports.favoriteMovie = (req, res) => {
    const movieI = parseInt(req.params.id)
    const saveMoviePromise = movieController.saveMovieIfDoesNotExist(movieId, req.body)
    
    saveMoviePromise.then(result => {
        User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, {favoriteMovies: {$elemMatch: {movieId: movieI}}}, function(err, user) {
            console.log("ERR: ", err)
            console.log("USER: ", user)
        })
        // User.find({results: { $elemMatch  : { _id: mongoose.Types.ObjectId(req.params.userId), favoriteMovies: movieId}}}, function(err, movie) {
        //     console.log("ERR: ", err)
        //     console.log("MOVIE: ", movie)
        // })
        // User.findOneAndUpdate(req.params.userId,
        //     { "$push": { "favoriteMovies": req.params.id } },
        //     {"new": true, upsert: true },
        //     function (err, user) {
        //         if (err) console.log("ERR IN FIND BY ID AND UPDATE:", err)
        //         else console.log("USER:", user)
        //     }
        // )
    })
    .catch(error => console.log("SAVE MOVIE ERR: ", error))
}







