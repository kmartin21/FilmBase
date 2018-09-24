const User = require('../models/user.model')

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
            user.save((err) => {
                if (err) {
                    res.status(415).json({ error: `${err.message}` })
                }
                res.status(201).send()
            })
        } else {
            res.json({ msg: 'User already exists' })
        }
    })
}

exports.favoriteMovie = (req, res) => {
    
}