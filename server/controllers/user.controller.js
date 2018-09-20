const User = require('../models/user.model')

exports.userCreate = (req, res) => {
    const user = new User({
        name: req.body.name
    })

    user.save((err) => {
        if (err) {
            return next(err)
        }
        res.send('User created successfully')
    })
}