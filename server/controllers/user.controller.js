const User = require('../models/user.model')
const movieController = require('./movie.controller')
const Movie = require('../models/movie.model')

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
    // console.log("ID: ", req.params.id)
    // console.log("ID: ", req.params.id.toString())
    // const p = movieController.findMovie(req.params.id)
    // console.log("P: ", p)
    // p.then(result => console.log("RESULT: ", result))
    // .catch(error => console.log("MOVIE CONTROLLER ERR: ", error))
    console.log("FAV MOVIE")
    Movie.findOne({movieId: `${req.params.id}`, function(err, result) {
        console.log("INSIDE FAV MOVIE")
        if(err) {
            console.log("ERRasd: ", err)
            reject(err)
        }
        if(result) {
            console.log("RESULT: ", result)
            resolve(result)
        } else {
            console.log("NO RESULT: ", result)
        }
    }})
}








