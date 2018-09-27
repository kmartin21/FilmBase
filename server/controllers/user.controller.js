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
    const saveMoviePromise = movieController.saveMovieIfDoesNotExist(req.params.id, req.body)
    saveMoviePromise.then(result => {
        console.log("RESULT: ", result)
        User.findByIdAndUpdate(req.params.userId,
            { "$push": { "favoriteMovies": req.params.id } },
            {"new": true, upsert: true },
            function (err, user) {
                if (err) console.log("ERR IN FIND BY ID AND UPDATE:", err)
                else console.log("USER:", user)
            }
        )
    })
    .catch(error => console.log("SAVE MOVIE ERR: ", error))
}








